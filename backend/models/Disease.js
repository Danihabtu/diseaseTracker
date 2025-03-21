const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symptoms: { type: String, required: true },
    prevention: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Disease', diseaseSchema);
