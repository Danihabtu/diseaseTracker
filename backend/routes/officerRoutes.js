const express = require('express');
const Officer = require('../models/Officer');
const router = express.Router();

// GET all officers (if needed)
router.get('/', async (req, res) => {
  try {
    const officers = await Officer.find().sort({ createdAt: -1 });
    res.json(officers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// POST add a new officer
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

// POST officer login (for healthcare officer)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const officer = await Officer.findOne({ email, password });
    if (!officer) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json(officer);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// PUT update an officer
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const updatedOfficer = await Officer.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedOfficer) {
      return res.status(404).json({ error: 'Officer not found' });
    }
    res.json(updatedOfficer);
  } catch (error) {
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
