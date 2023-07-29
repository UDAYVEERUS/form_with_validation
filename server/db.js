const mongoose = require('mongoose');
require('dotenv').config()
const MONGODB_URI = "mongodb+srv://uday:9670957901@cluster0.4j1e9wt.mongodb.net/test"

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database Connected Successfully');
  } catch (error) {
    console.error('something went wrong', error.message);
  }
};

module.exports = connectDB;
