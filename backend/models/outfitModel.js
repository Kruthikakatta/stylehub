const mongoose = require('mongoose');

const outfitSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String,
    category: String
});

module.exports = mongoose.model('Outfit', outfitSchema);
