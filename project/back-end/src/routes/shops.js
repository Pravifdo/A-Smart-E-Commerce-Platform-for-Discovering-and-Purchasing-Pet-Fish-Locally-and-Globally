const express = require('express');
const router = express.Router();
const Shop = require('../models/shops');

// Get all shops
router.get('/', async (req, res) => {
  try {
    const shops = await Shop.find();
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error: error.message });
  }
});

// Get shop by ID
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id);
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop', error: error.message });
  }
});

// Create new shop
router.post('/', async (req, res) => {
  try {
    const newShop = new Shop(req.body);
    await newShop.save();
    res.status(201).json({ message: 'Shop added successfully', shop: newShop });
  } catch (error) {
    res.status(500).json({ message: 'Error adding shop', error: error.message });
  }
});

// Update shop
router.put('/:id', async (req, res) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop updated successfully', shop: updatedShop });
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop', error: error.message });
  }
});

// Delete shop
router.delete('/:id', async (req, res) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.id);
    if (!deletedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json({ message: 'Shop deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting shop', error: error.message });
  }
});

module.exports = router;