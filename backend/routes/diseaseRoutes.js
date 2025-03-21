const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();

// GET all diseases
router.get('/', async (req, res) => {
  try {
    const diseases = await Disease.find().sort({ createdAt: -1 });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// POST add a new disease
router.post('/', async (req, res) => {
  try {
    const { name, symptoms, prevention } = req.body;
    const newDisease = new Disease({ name, symptoms, prevention });
    const savedDisease = await newDisease.save();
    res.status(201).json(savedDisease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// PUT update an existing disease
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const updatedDisease = await Disease.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedDisease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json(updatedDisease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// DELETE a disease
router.delete('/:id', async (req, res) => {
  try {
    const deletedDisease = await Disease.findByIdAndDelete(req.params.id);
    if (!deletedDisease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json({ message: 'Disease deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

module.exports = router;
