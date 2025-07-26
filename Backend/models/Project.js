const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  category: {
    type: String,
    required: true,
    enum: ['living-room', 'kitchen', 'bedroom', 'bathroom', 'office', 'commercial', 'full-home']
  },
  style: {
    type: String,
    enum: ['modern', 'traditional', 'minimalist', 'industrial', 'bohemian', 'scandinavian'],
    required: true
  },
  budget: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    spent: {
      type: Number,
      default: 0
    }
  },
  timeline: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    actualEndDate: Date
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'review', 'completed', 'cancelled'],
    default: 'pending'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  images: [{
    url: String,
    caption: String,
    isMain: { type: Boolean, default: false }
  }],
  documents: [{
    name: String,
    url: String,
    type: String
  }],
  requirements: {
    rooms: [String],
    specialRequests: String,
    accessibility: Boolean
  },
  feedback: {
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    date: Date
  },
  isPublic: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
projectSchema.index({ client: 1, status: 1 });
projectSchema.index({ designer: 1, status: 1 });
projectSchema.index({ category: 1, style: 1 });

module.exports = mongoose.model('Project', projectSchema);