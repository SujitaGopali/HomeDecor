const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Design title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Design description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  designer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['living-room', 'kitchen', 'bedroom', 'bathroom', 'office', 'commercial', 'outdoor']
  },
  style: {
    type: String,
    enum: ['modern', 'traditional', 'minimalist', 'industrial', 'bohemian', 'scandinavian', 'contemporary'],
    required: true
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: String,
    isMain: {
      type: Boolean,
      default: false
    }
  }],
  tags: [String],
  colors: [{
    name: String,
    hex: String
  }],
  materials: [String],
  furniture: [{
    item: String,
    brand: String,
    price: Number,
    link: String
  }],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['ft', 'm'],
      default: 'ft'
    }
  },
  budget: {
    estimated: Number,
    actual: Number
  },
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  views: {
    type: Number,
    default: 0
  },
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublic: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for better query performance
designSchema.index({ category: 1, style: 1 });
designSchema.index({ designer: 1, isPublic: 1 });
designSchema.index({ isFeatured: 1, createdAt: -1 });
designSchema.index({ 'rating.average': -1 });

// Calculate average rating
designSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = sum / this.reviews.length;
    this.rating.count = this.reviews.length;
  }
  return this.save();
};

module.exports = mongoose.model('Design', designSchema);