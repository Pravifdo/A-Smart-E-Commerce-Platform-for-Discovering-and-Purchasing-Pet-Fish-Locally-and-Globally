const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://praveen:praveen2003@cluster2003.d0scf.mongodb.net/Cluster2003?retryWrites=true&w=majority');
    console.log('✅ MongoDB connected successfully to Atlas cluster');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }

  mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB disconnected. Attempting to reconnect...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected successfully');
  });
};

module.exports = connectDB;
