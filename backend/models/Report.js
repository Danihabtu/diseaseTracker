const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  officer: { type: mongoose.Schema.Types.ObjectId, ref: 'Officer', required: true },
  region: { type: String, required: true },
  disease: { type: String, required: true },
  newDisease: { type: String }, // In case a new disease is added
  patients: { type: Number, required: true },
  deaths: { type: Number, required: true },
  recovered: { type: Number, required: true },
  additionalInfo: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
