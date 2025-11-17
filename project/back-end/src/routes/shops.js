const express = require('express');
const router = express.Router();
const Shop = require('../models/shops');
const bcrypt = require('bcrypt');

// ==============================
// Business Registration
// ==============================
router.post('/register', async (req, res) => {
  const { email, password, name, phone, address, imageUrl } = req.body;

  console.log('Registration attempt:', { email, name });

  try {
    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, Email, and Password are required.' });
    }

    // Check if email exists
    const existingShop = await Shop.findOne({ email });
    if (existingShop) {
      return res.status(400).json({ message: 'Business email already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create shop
    const newShop = new Shop({
      name,
      email,
      password: hashedPassword,
      phone: phone || '',
      address: {
        street: address || '',
        city: '',
        state: '',
        zipCode: '',
        country: 'USA'
      },
      owner: name,
      description: `Welcome to ${name}!`,
      imageUrl: imageUrl || '' // Base64 image string or empty
    });

    await newShop.save();

    const shopData = newShop.toObject();
    delete shopData.password;

    console.log('Shop registered:', shopData._id);

    res.status(201).json({
      message: 'Business registered successfully',
      shop: shopData
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  console.log('Registration attempt:', { email, name } );
});

// ==============================
// Business Login
// ==============================
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and Password are required.' });
    }

    const shop = await Shop.findOne({ email });
    if (!shop) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, shop.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const shopData = shop.toObject();
    delete shopData.password;

    res.status(200).json({
      message: 'Login successful',
      shop: shopData
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
  console.log('Login attempt:', { email } );
});

// ==============================
// Get all shops
// ==============================
router.get('/', async (req, res) => {
  try {
    const shops = await Shop.find().select('-password');
    res.status(200).json(shops);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shops', error: error.message });
  }
});

// ==============================
// Get shop by ID
// ==============================
router.get('/:id', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.id).select('-password');
    if (!shop) {
      return res.status(404).json({ message: 'Shop not found' });
    }
    res.status(200).json(shop);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching shop', error: error.message });
  }
});

// ==============================
// Update shop
// ==============================
router.put('/:id', async (req, res) => {
  try {
    // If password is supplied, hash it
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const updatedShop = await Shop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-password');

    if (!updatedShop) {
      return res.status(404).json({ message: 'Shop not found' });
    }

    res.status(200).json({
      message: 'Shop updated successfully',
      shop: updatedShop
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating shop', error: error.message });
  }
});

// ==============================
// Delete shop
// ==============================
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
