// routes/newsRoutes.js
const express = require('express');
const News = require('../models/News');
const router = express.Router();

// GET all news articles
router.get('/', async (req, res) => {
  try {
    const newsArticles = await News.find().sort({ createdAt: -1 });
    res.json(newsArticles);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// POST add a new news article
router.post('/', async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ message: 'Image URL is required' });
    const newArticle = new News({ title, content, imageUrl });
    const savedArticle = await newArticle.save();
    res.status(201).json(savedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// PUT update an existing news article
router.put('/:id', async (req, res) => {
  try {
    const updateData = req.body;
    const updatedArticle = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

// DELETE a news article
router.delete('/:id', async (req, res) => {
  try {
    const deletedArticle = await News.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error: ' + error.message });
  }
});

module.exports = router;
