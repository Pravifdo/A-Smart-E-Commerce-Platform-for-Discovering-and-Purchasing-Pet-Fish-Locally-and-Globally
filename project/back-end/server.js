const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/database');
const authRoutes = require('./src/routes/auth');
const profileRoutes = require('./src/routes/profileRoutes');

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});