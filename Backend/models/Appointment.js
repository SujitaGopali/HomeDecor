const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  title: {
    type: String,
    required: [true, 'Appointment title is required'],
    trim: true
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  type: {
    type: String,
    enum: ['consultation', 'design-review', 'site-visit', 'final-presentation', 'follow-up'],
    required: true
  },
  scheduledDate: {
    type: Date,
    required: true
  },
  duration: {
    type: Number, // in minutes
    default: 60
  },
  location: {
    type: {
      type: String,
      enum: ['online', 'client-location', 'office'],
      default: 'online'
    },
    address: String,
    meetingLink: String
  },
  status: {
    type: String,
    enum: ['scheduled', 'confirmed', 'in-progress', 'completed', 'cancelled', 'rescheduled'],
    default: 'scheduled'
  },
  notes: {
    beforeMeeting: String,
    afterMeeting: String
  },
  reminders: [{
    type: {
      type: String,
      enum: ['email', 'sms']
    },
    sentAt: Date,
    scheduledFor: Date
  }],
  attachments: [{
    name: String,
    url: String,
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
}, {
  timestamps: true
});

// Index for better query performance
appointmentSchema.index({ client: 1, scheduledDate: 1 });
appointmentSchema.index({ designer: 1, scheduledDate: 1 });
appointmentSchema.index({ status: 1, scheduledDate: 1 });

module.exports = mongoose.model('Appointment', appointmentSchema);