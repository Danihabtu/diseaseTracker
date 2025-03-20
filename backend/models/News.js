// models/News.js
const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true }, // Ensuring imageUrl is required
  },
  { timestamps: true } // Automatically creates createdAt and updatedAt
);

module.exports = mongoose.model('News', NewsSchema);
