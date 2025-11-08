const mongoose = require('mongoose');

const bmpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  topic: {
    type: String,
    enum: ['Water Quality', 'Feeding', 'Tank Maintenance', 'Health Care', 'Breeding', 'General'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  steps: [{
    stepNumber: { type: Number, required: true },
    instruction: { type: String, required: true },
    tips: [{ type: String }]
  }],
  difficulty: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  estimatedTime: {
    type: String,
    required: false
  },
  materials: [{
    type: String
  }],
  warnings: [{
    type: String
  }],
  benefits: [{
    type: String
  }],
  imageUrl: {
    type: String,
    default: '/images/bmp-default.jpg'
  },
  videoUrl: {
    type: String
  },
  author: {
    type: String,
    default: 'AquaTrade Team'
  },
  tags: [{
    type: String
  }],
  viewCount: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp before saving
bmpSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for text search
bmpSchema.index({ title: 'text', description: 'text', tags: 'text' });

module.exports = mongoose.model('BMP', bmpSchema);