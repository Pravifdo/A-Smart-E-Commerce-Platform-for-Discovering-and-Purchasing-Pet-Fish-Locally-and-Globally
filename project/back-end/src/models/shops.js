const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'General'
  },
  imageUrl: {
    type: String,
    default: '' // Base64 image or empty
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

// Automatically update updatedAt timestamp before saving
shopSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Optional: virtual to get all fish in this shop
shopSchema.virtual('fish', {
  ref: 'Fish',
  localField: '_id',
  foreignField: 'shopId',
});

// Ensure virtuals are included when converting to JSON
shopSchema.set('toJSON', { virtuals: true });
shopSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Shop', shopSchema);
