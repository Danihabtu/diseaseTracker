// backend/routes/officerRoutes.js

const express = require('express');
const Officer = require('../models/Officer');
const router = express.Router();

// GET all healthcare officers
router.get('/', async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 });
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// POST add a new officer
// backend/routes/officerRoutes.js

router.post('/', async (req, res) => {
    try {
      const { name, email, role, password } = req.body;
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const newOfficer = new Officer({ name, email, role, password });
      const savedOfficer = await newOfficer.save();
      res.status(201).json(savedOfficer);
    } catch (error) {
      res.status(500).json({ message: 'Server Error: ' + error.message });
    }
  });
  

// backend/routes/officerRoutes.js
router.put('/:id', async (req, res) => {
    try {
      // req.body might include a password if provided; if it's not provided, that field can be omitted.
      const updateData = req.body;
      const updatedOfficer = await Officer.findByIdAndUpdate(req.params.id, updateData, { new: true });
      if (!updatedOfficer) {
        return res.status(404).json({ error: 'Officer not found' });
      }
      res.json(updatedOfficer);
    } catch (error) {
      console.error("Error updating officer:", error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

// DELETE an officer
router.delete('/:id', async (req, res) => {
  try {
    const deletedOfficer = await Officer.findByIdAndDelete(req.params.id);
    if (!deletedOfficer)
      return res.status(404).json({ message: 'Officer not found' });
    res.json({ message: 'Officer deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

module.exports = router;
