// index.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://stylehub_user:Stylehub123@stylehub.fmxjjhd.mongodb.net/stylehub?retryWrites=true&w=majority&appName=stylehub', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Atlas connected successfully!'))
.catch(err => console.error('❌ MongoDB Atlas connection error:', err));

// Sample route
app.get('/', (req, res) => {
  res.send('Backend is working and connected to MongoDB Atlas!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
