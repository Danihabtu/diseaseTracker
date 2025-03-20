// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const officerRoutes = require('./routes/officerRoutes'); // Officer management
const newsRoutes = require('./routes/newsRoutes');         // News management
const diseaseRoutes = require('./routes/diseaseRoutes');   // Disease management

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect('mongodb://localhost:27017/diseaseTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/officers', officerRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/diseases', diseaseRoutes);

app.get('/', (req, res) => {
  res.send('Server is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
