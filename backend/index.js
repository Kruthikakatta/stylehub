// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://stylehub_user:stylehub_user@stylehub.fmxjjhd.mongodb.net/stylehub?retryWrites=true&w=majority&appName=stylehub';

mongoose.connect(MONGODB_URI)
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

// API Routes (before static files)
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

// Serve static files from Angular app
// Try nested browser directory first (new Angular build structure)
const nestedPath = path.join(__dirname, '../frontend/dist/browser/browser');
const flatPath = path.join(__dirname, '../frontend/dist/browser');
const fs = require('fs');

let frontendPath;
if (fs.existsSync(nestedPath) && fs.existsSync(path.join(nestedPath, 'index.html'))) {
  frontendPath = nestedPath;
  console.log('✅ Serving frontend from:', frontendPath);
} else if (fs.existsSync(flatPath) && fs.existsSync(path.join(flatPath, 'index.html'))) {
  frontendPath = flatPath;
  console.log('✅ Serving frontend from:', frontendPath);
} else {
  console.warn('⚠️ Frontend build not found. Make sure to build the frontend before starting the server.');
  console.warn('   Expected paths:', nestedPath, 'or', flatPath);
}

if (frontendPath) {
  app.use(express.static(frontendPath));
  
  // Handle Angular routing - return index.html for all non-API routes
  // Use catch-all route compatible with Express 5
  app.get(/^(?!\/api).*/, (req, res) => {
    const indexPath = path.join(frontendPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send('Frontend index.html not found. Please rebuild the frontend.');
    }
  });
}

// ======================
// START SERVER
// ======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
