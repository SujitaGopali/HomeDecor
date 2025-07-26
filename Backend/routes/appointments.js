const express = require('express');
const { body, validationResult } = require('express-validator');
const Appointment = require('../models/Appointment');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/appointments
// @desc    Create new appointment
// @access  Private
router.post('/', [
  auth,
  body('designer').isMongoId().withMessage('Valid designer ID is required'),
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('type').isIn(['consultation', 'design-review', 'site-visit', 'final-presentation', 'follow-up']),
  body('scheduledDate').isISO8601().withMessage('Valid scheduled date is required'),
  body('duration').optional().isInt({ min: 15, max: 480 }).withMessage('Duration must be between 15 and 480 minutes')
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

    const { designer, title, description, type, scheduledDate, duration, location, project } = req.body;

    // Verify designer exists and is actually a designer/admin
    const designerUser = await User.findById(designer);
    if (!designerUser) {
      return res.status(404).json({
        success: false,
        message: 'Designer not found'
      });
    }

    // Check if scheduled date is in the future
    const appointmentDate = new Date(scheduledDate);
    if (appointmentDate <= new Date()) {
      return res.status(400).json({
        success: false,
        message: 'Appointment must be scheduled for a future date'
      });
    }

    // Check for conflicting appointments (same designer, overlapping time)
    const appointmentEnd = new Date(appointmentDate.getTime() + (duration || 60) * 60000);
    const conflictingAppointment = await Appointment.findOne({
      designer,
      status: { $in: ['scheduled', 'confirmed'] },
      $or: [
        {
          scheduledDate: {
            $gte: appointmentDate,
            $lt: appointmentEnd
          }
        },
        {
          $expr: {
            $and: [
              { $lte: ['$scheduledDate', appointmentDate] },
              { $gte: [{ $add: ['$scheduledDate', { $multiply: ['$duration', 60000] }] }, appointmentDate] }
            ]
          }
        }
      ]
    });

    if (conflictingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'Designer is not available at the selected time'
      });
    }

    const appointment = await Appointment.create({
      client: req.user.id,
      designer,
      title,
      description,
      type,
      scheduledDate: appointmentDate,
      duration: duration || 60,
      location,
      project
    });

    await appointment.populate([
      { path: 'client', select: 'name email avatar' },
      { path: 'designer', select: 'name email avatar' },
      { path: 'project', select: 'title' }
    ]);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });

  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/appointments
// @desc    Get appointments (filtered by user role)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let filter = {};
    
    // Filter based on user role
    if (req.user.role === 'admin') {
      // Admin can see all appointments
    } else {
      // Regular users can only see their appointments (as client or designer)
      filter.$or = [
        { client: req.user.id },
        { designer: req.user.id }
      ];
    }

    // Apply additional filters
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.type) {
      filter.type = req.query.type;
    }
    if (req.query.date) {
      const startDate = new Date(req.query.date);
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      filter.scheduledDate = {
        $gte: startDate,
        $lt: endDate
      };
    }

    const appointments = await Appointment.find(filter)
      .populate('client', 'name email avatar')
      .populate('designer', 'name email avatar')
      .populate('project', 'title')
      .sort({ scheduledDate: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Appointment.countDocuments(filter);

    res.json({
      success: true,
      appointments,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        limit
      }
    });

  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/appointments/:id
// @desc    Get appointment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('client', 'name email avatar phone')
      .populate('designer', 'name email avatar phone')
      .populate('project', 'title description');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user has access to this appointment
    const hasAccess = req.user.role === 'admin' ||
                     appointment.client._id.toString() === req.user.id ||
                     appointment.designer._id.toString() === req.user.id;

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    res.json({
      success: true,
      appointment
    });

  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/appointments/:id
// @desc    Update appointment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    const canUpdate = req.user.role === 'admin' ||
                     appointment.client.toString() === req.user.id ||
                     appointment.designer.toString() === req.user.id;

    if (!canUpdate) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    const allowedUpdates = ['title', 'description', 'scheduledDate', 'duration', 'location', 'status', 'notes'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    // Validate rescheduling
    if (updates.scheduledDate) {
      const newDate = new Date(updates.scheduledDate);
      if (newDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Appointment must be scheduled for a future date'
        });
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    ).populate([
      { path: 'client', select: 'name email avatar' },
      { path: 'designer', select: 'name email avatar' },
      { path: 'project', select: 'title' }
    ]);

    res.json({
      success: true,
      message: 'Appointment updated successfully',
      appointment: updatedAppointment
    });

  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/appointments/:id
// @desc    Cancel/Delete appointment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check permissions
    const canDelete = req.user.role === 'admin' ||
                     appointment.client.toString() === req.user.id ||
                     appointment.designer.toString() === req.user.id;

    if (!canDelete) {
      return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }

    // Instead of deleting, mark as cancelled
    appointment.status = 'cancelled';
    await appointment.save();

    res.json({
      success: true,
      message: 'Appointment cancelled successfully'
    });

  } catch (error) {
    console.error('Cancel appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/appointments/designer/:designerId/availability
// @desc    Get designer availability
// @access  Private
router.get('/designer/:designerId/availability', auth, async (req, res) => {
  try {
    const { designerId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date parameter is required'
      });
    }

    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 1);

    const appointments = await Appointment.find({
      designer: designerId,
      status: { $in: ['scheduled', 'confirmed'] },
      scheduledDate: {
        $gte: startDate,
        $lt: endDate
      }
    }).select('scheduledDate duration');

    // Generate available time slots (9 AM to 6 PM, 1-hour slots)
    const availableSlots = [];
    const workStart = 9; // 9 AM
    const workEnd = 18; // 6 PM

    for (let hour = workStart; hour < workEnd; hour++) {
      const slotTime = new Date(startDate);
      slotTime.setHours(hour, 0, 0, 0);

      // Check if this slot conflicts with existing appointments
      const hasConflict = appointments.some(apt => {
        const aptStart = new Date(apt.scheduledDate);
        const aptEnd = new Date(aptStart.getTime() + apt.duration * 60000);
        const slotEnd = new Date(slotTime.getTime() + 60 * 60000);

        return (slotTime >= aptStart && slotTime < aptEnd) ||
               (slotEnd > aptStart && slotEnd <= aptEnd) ||
               (slotTime <= aptStart && slotEnd >= aptEnd);
      });

      if (!hasConflict && slotTime > new Date()) {
        availableSlots.push(slotTime.toISOString());
      }
    }

    res.json({
      success: true,
      date,
      availableSlots,
      bookedSlots: appointments.map(apt => ({
        start: apt.scheduledDate,
        duration: apt.duration
      }))
    });

  } catch (error) {
    console.error('Get availability error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;