const express = require('express');
const router = express.Router();
const Fish = require('../models/Fish');

// Get all fish
router.get('/', async (req, res) => {
  try {
    const fish = await Fish.find();
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fish', error: error.message });
  }
});

// Get fish by ID
router.get('/:id', async (req, res) => {
  try {
    const fish = await Fish.findById(req.params.id);
    if (!fish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    res.status(200).json(fish);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fish', error: error.message });
  }
});

// Create new fish (admin)
router.post('/', async (req, res) => {
  try {
    const newFish = new Fish(req.body);
    await newFish.save();
    res.status(201).json({ message: 'Fish added successfully', fish: newFish });
  } catch (error) {
    res.status(500).json({ message: 'Error adding fish', error: error.message });
  }
});

// Update fish (admin)
router.put('/:id', async (req, res) => {
  try {
    const updatedFish = await Fish.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedFish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    res.status(200).json({ message: 'Fish updated successfully', fish: updatedFish });
  } catch (error) {
    res.status(500).json({ message: 'Error updating fish', error: error.message });
  }
});

// Delete fish (admin)
router.delete('/:id', async (req, res) => {
  try {
    const deletedFish = await Fish.findByIdAndDelete(req.params.id);
    if (!deletedFish) {
      return res.status(404).json({ message: 'Fish not found' });
    }
    res.status(200).json({ message: 'Fish deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting fish', error: error.message });
  }
});

module.exports = router;