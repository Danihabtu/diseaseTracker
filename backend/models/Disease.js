// backend/models/Disease.js
const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symptoms: { type: String, required: true },
    prevention: { type: String, required: true },
    // Add additional fields as needed (e.g., description, treatment)
  },
  { timestamps: true }
);

module.exports = mongoose.model('Disease', diseaseSchema);
