const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profileRoutes');
const fishRoutes = require('./src/routes/fish');
const shopRoutes = require('./src/routes/shops');
const bmpRoutes = require('./src/routes/BMP');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/fish', fishRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/bmp', bmpRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 API available at http://localhost:${PORT}`);
});