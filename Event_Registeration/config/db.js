dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongodb, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 60000,
      connectTimeoutMS: 10000,
      retryWrites: true,
      maxPoolSize: 10,
      minPoolSize: 5,
      maxIdleTimeMS: 30000,
      family: 4
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    setTimeout(() => connectDB(), 5000);
  }
};

module.exports = connectDB;