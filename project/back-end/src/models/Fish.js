const mongoose = require('mongoose');

const fishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  species: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['Freshwater', 'Saltwater', 'Tropical', 'Coldwater'],
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  temperament: {
    type: String,
    required: true
  },
  careLevel: {
    type: String,
    enum: ['Easy', 'Moderate', 'Difficult', 'Expert'],
    default: 'Moderate'
  },
  imageUrl: {
    type: String,
    default: '/images/fish-default.jpg'
  },
  shopId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shop',
    required: false
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  waterParameters: {
    pH: { type: String },
    temperature: { type: String },
    hardness: { type: String }
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
fishSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Fish', fishSchema);