// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect(
  'mongodb+srv://stylehub_user:stylehub_user@stylehub.fmxjjhd.mongodb.net/stylehub?retryWrites=true&w=majority&appName=stylehub'
)
  .then(() => console.log('✅ MongoDB Atlas connected successfully!'))
  .catch(err => console.error('❌ MongoDB Atlas connection error:', err));

// ======================
// OUTFIT MODEL
// ======================
const outfitSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  category: String
});

const Outfit = mongoose.model('Outfit', outfitSchema);

// ======================
// ROUTES
// ======================

// Test route
app.get('/', (req, res) => {
  res.send('Backend is working and ready for outfits!');
});

// Auth routes
app.use('/api/auth', authRoutes);

// Get all outfits
app.get('/api/outfits', async (req, res) => {
  const outfits = await Outfit.find();
  res.json(outfits);
});

// Get outfit by ID
app.get('/api/outfits/:id', async (req, res) => {
  const outfit = await Outfit.findById(req.params.id);
  if (!outfit) return res.status(404).json({ message: 'Outfit not found' });
  res.json(outfit);
});

// Create new outfit
app.post('/api/outfits', async (req, res) => {
  const outfit = new Outfit(req.body);
  await outfit.save();
  res.status(201).json(outfit);
});

// Update outfit
app.put('/api/outfits/:id', async (req, res) => {
  const outfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!outfit) return res.status(404).json({ message: 'Outfit not found' });
  res.json(outfit);
});

// Delete outfit
app.delete('/api/outfits/:id', async (req, res) => {
  await Outfit.findByIdAndDelete(req.params.id);
  res.json({ message: 'Outfit deleted successfully' });
});

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
