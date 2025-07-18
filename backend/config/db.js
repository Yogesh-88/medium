const mongoose = require('mongoose');
const { MONGO_URI } = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {});
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB connection error', error);
    process.exit(1);
  }
};

module.exports = connectDB;
