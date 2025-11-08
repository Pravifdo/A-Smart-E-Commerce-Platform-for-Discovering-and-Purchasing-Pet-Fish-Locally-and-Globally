const express = require('express');
const router = express.Router();
const BMP = require('../models/bmp');

// Get all best management practices
router.get('/', async (req, res) => {
  try {
    const practices = await BMP.find();
    res.status(200).json(practices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practices', error: error.message });
  }
});

// Get BMP by ID
router.get('/:id', async (req, res) => {
  try {
    const practice = await BMP.findById(req.params.id);
    if (!practice) {
      return res.status(404).json({ message: 'Practice not found' });
    }
    res.status(200).json(practice);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practice', error: error.message });
  }
});

// Get BMP by topic
router.get('/topic/:topic', async (req, res) => {
  try {
    const practices = await BMP.find({ topic: req.params.topic });
    res.status(200).json(practices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching practices', error: error.message });
  }
});

// Create new BMP
router.post('/', async (req, res) => {
  try {
    const newPractice = new BMP(req.body);
    await newPractice.save();
    res.status(201).json({ message: 'Practice added successfully', practice: newPractice });
  } catch (error) {
    res.status(500).json({ message: 'Error adding practice', error: error.message });
  }
});

// Update BMP
router.put('/:id', async (req, res) => {
  try {
    const updatedPractice = await BMP.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPractice) {
      return res.status(404).json({ message: 'Practice not found' });
    }
    res.status(200).json({ message: 'Practice updated successfully', practice: updatedPractice });
  } catch (error) {
    res.status(500).json({ message: 'Error updating practice', error: error.message });
  }
});

// Delete BMP
router.delete('/:id', async (req, res) => {
  try {
    const deletedPractice = await BMP.findByIdAndDelete(req.params.id);
    if (!deletedPractice) {
      return res.status(404).json({ message: 'Practice not found' });
    }
    res.status(200).json({ message: 'Practice deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting practice', error: error.message });
  }
});

module.exports = router;