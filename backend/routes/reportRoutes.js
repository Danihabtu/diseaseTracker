const express = require('express');
const Report = require('../models/Report');
const router = express.Router();

// POST create a new report
router.post('/', async (req, res) => {
  try {
    const { officer, region, disease, newDisease, patients, deaths, recovered, additionalInfo } = req.body;
    const report = new Report({
      officer,
      region,
      disease,
      newDisease,
      patients,
      deaths,
      recovered,
      additionalInfo
    });
    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// (Optional) GET all reports
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find().populate('officer');
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

module.exports = router;
