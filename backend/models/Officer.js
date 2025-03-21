const mongoose = require('mongoose');

const officerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: { type: String, required: true }, // Added password field
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Officer', officerSchema);
