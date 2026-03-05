require('dotenv').config();
const mongoose = require('mongoose');


const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Stop server if DB fails
  }
};

module.exports = connectToMongo;