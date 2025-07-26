const express = require('express');
const { body, validationResult } = require('express-validator');
const Project = require('../models/Project');
const User = require('../models/User');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

// @route   POST /api/projects
// @desc    Create new project
// @access  Private
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['living-room', 'kitchen', 'bedroom', 'bathroom', 'office', 'commercial', 'full-home']),
  body('style').isIn(['modern', 'traditional', 'minimalist', 'industrial', 'bohemian', 'scandinavian']),
  body('budget.min').isNumeric().withMessage('Minimum budget must be a number'),
  body('budget.max').isNumeric().withMessage('Maximum budget must be a number'),
  body('timeline.startDate').isISO8601().withMessage('Start date must be valid'),
  body('timeline.endDate').isISO8601().withMessage('End date must be valid')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const projectData = {
      ...req.body,
      client: req.user.id
    };

    // Validate budget
    if (projectData.budget.min >= projectData.budget.max) {
      return res.status(400).json({
        success: false,
        message: 'Maximum budget must be greater than minimum budget'
      });
    }

    // Validate dates
    const startDate = new Date(projectData.timeline.startDate);
    const endDate = new Date(projectData.timeline.endDate);
    
    if (startDate >= endDate) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date'
      });
    }

    const project = await Project.create(projectData);
    await project.populate('client', 'name email');

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      project
    });

  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/projects
// @desc    Get projects (filtered by user role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    // If user is not admin, only show their projects
    if (req.user.role !== 'admin') {
      filter.client = req.user.id;
    }

    // Apply additional filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.style) {
      filter.style = req.query.style;
    }

    const projects = await Project.find(filter)
      .populate('client', 'name email avatar')
      .populate('designer', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Project.countDocuments(filter);

    res.json({
      success: true,
      projects,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email avatar phone')
      .populate('designer', 'name email avatar phone');

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check if user has access to this project
    if (req.user.role !== 'admin' && 
        project.client._id.toString() !== req.user.id && 
        (!project.designer || project.designer._id.toString() !== req.user.id)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      project
    });

  } catch (error) {
    console.error('Get project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/projects/:id
// @desc    Update project
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Check permissions
    const canUpdate = req.user.role === 'admin' || 
                     project.client.toString() === req.user.id ||
                     (project.designer && project.designer.toString() === req.user.id);

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = ['title', 'description', 'status', 'progress', 'budget', 'timeline', 'images', 'requirements'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Only admin or designer can assign designer
    if (req.body.designer && (req.user.role === 'admin' || project.designer?.toString() === req.user.id)) {
      updates.designer = req.body.designer;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('client', 'name email avatar')
     .populate('designer', 'name email avatar');

    res.json({
      success: true,
      message: 'Project updated successfully',
      project: updatedProject
    });

  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete project
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Only admin or project owner can delete
    if (req.user.role !== 'admin' && project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Project.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/projects/:id/feedback
// @desc    Add project feedback
// @access  Private
router.post('/:id/feedback', [
  auth,
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').optional().trim().isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found'
      });
    }

    // Only project client can leave feedback
    if (project.client.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Only project client can leave feedback'
      });
    }

    // Project must be completed to leave feedback
    if (project.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Project must be completed to leave feedback'
      });
    }

    project.feedback = {
      rating: req.body.rating,
      comment: req.body.comment,
      date: new Date()
    };

    await project.save();

    res.json({
      success: true,
      message: 'Feedback added successfully',
      feedback: project.feedback
    });

  } catch (error) {
    console.error('Add feedback error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;