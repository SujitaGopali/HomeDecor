const express = require('express');
const { body, validationResult } = require('express-validator');
const Design = require('../models/Design');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/designs
// @desc    Create new design
// @access  Private (Admin/Designer)
router.post('/', [
  auth,
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['living-room', 'kitchen', 'bedroom', 'bathroom', 'office', 'commercial', 'outdoor']),
  body('style').isIn(['modern', 'traditional', 'minimalist', 'industrial', 'bohemian', 'scandinavian', 'contemporary']),
  body('images').isArray({ min: 1 }).withMessage('At least one image is required')
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

    // Only admin or designers can create designs
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Only designers can create designs.'
      });
    }

    const designData = {
      ...req.body,
      designer: req.user.id
    };

    const design = await Design.create(designData);
    await design.populate('designer', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Design created successfully',
      design
    });

  } catch (error) {
    console.error('Create design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/designs
// @desc    Get all public designs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    let filter = { isPublic: true };

    // Apply filters
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.style) {
      filter.style = req.query.style;
    }
    if (req.query.designer) {
      filter.designer = req.query.designer;
    }
    if (req.query.featured === 'true') {
      filter.isFeatured = true;
    }

    // Search functionality
    if (req.query.search) {
      filter.$or = [
        { title: { $regex: req.query.search, $options: 'i' } },
        { description: { $regex: req.query.search, $options: 'i' } },
        { tags: { $in: [new RegExp(req.query.search, 'i')] } }
      ];
    }

    // Sort options
    let sort = { createdAt: -1 }; // Default: newest first
    if (req.query.sort === 'popular') {
      sort = { views: -1 };
    } else if (req.query.sort === 'rating') {
      sort = { 'rating.average': -1 };
    } else if (req.query.sort === 'likes') {
      sort = { 'likes': -1 };
    }

    const designs = await Design.find(filter)
      .populate('designer', 'name avatar')
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .select('-reviews'); // Exclude reviews for list view

    const total = await Design.countDocuments(filter);

    res.json({
      success: true,
      designs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get designs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/designs/:id
// @desc    Get design by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const design = await Design.findById(req.params.id)
      .populate('designer', 'name email avatar')
      .populate('reviews.user', 'name avatar');

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      });
    }

    // Increment view count
    design.views += 1;
    await design.save();

    res.json({
      success: true,
      design
    });

  } catch (error) {
    console.error('Get design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/designs/:id
// @desc    Update design
// @access  Private (Designer/Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && design.designer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = ['title', 'description', 'category', 'style', 'images', 'tags', 'colors', 'materials', 'furniture', 'dimensions', 'budget', 'isPublic'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Only admin can set featured status
    if (req.body.isFeatured !== undefined && req.user.role === 'admin') {
      updates.isFeatured = req.body.isFeatured;
    }

    const updatedDesign = await Design.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate('designer', 'name email avatar');

    res.json({
      success: true,
      message: 'Design updated successfully',
      design: updatedDesign
    });

  } catch (error) {
    console.error('Update design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/designs/:id
// @desc    Delete design
// @access  Private (Designer/Admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      });
    }

    // Check permissions
    if (req.user.role !== 'admin' && design.designer.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    await Design.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Design deleted successfully'
    });

  } catch (error) {
    console.error('Delete design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/designs/:id/like
// @desc    Like/Unlike design
// @access  Private
router.post('/:id/like', auth, async (req, res) => {
  try {
    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      });
    }

    const existingLike = design.likes.find(like => like.user.toString() === req.user.id);

    if (existingLike) {
      // Unlike
      design.likes = design.likes.filter(like => like.user.toString() !== req.user.id);
    } else {
      // Like
      design.likes.push({ user: req.user.id });
    }

    await design.save();

    res.json({
      success: true,
      message: existingLike ? 'Design unliked' : 'Design liked',
      liked: !existingLike,
      likesCount: design.likes.length
    });

  } catch (error) {
    console.error('Like design error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/designs/:id/review
// @desc    Add review to design
// @access  Private
router.post('/:id/review', [
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

    const design = await Design.findById(req.params.id);

    if (!design) {
      return res.status(404).json({
        success: false,
        message: 'Design not found'
      });
    }

    // Check if user already reviewed this design
    const existingReview = design.reviews.find(review => review.user.toString() === req.user.id);

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this design'
      });
    }

    // Add review
    design.reviews.push({
      user: req.user.id,
      rating: req.body.rating,
      comment: req.body.comment
    });

    // Recalculate average rating
    await design.calculateAverageRating();

    await design.populate('reviews.user', 'name avatar');

    res.json({
      success: true,
      message: 'Review added successfully',
      review: design.reviews[design.reviews.length - 1],
      rating: design.rating
    });

  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/designs/designer/:designerId
// @desc    Get designs by designer
// @access  Public
router.get('/designer/:designerId', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {
      designer: req.params.designerId,
      isPublic: true
    };

    const designs = await Design.find(filter)
      .populate('designer', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-reviews');

    const total = await Design.countDocuments(filter);

    res.json({
      success: true,
      designs,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get designer designs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;