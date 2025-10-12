const Outfit = require('../models/outfitModel');

exports.getOutfits = async (req, res) => {
    const outfits = await Outfit.find();
    res.json(outfits);
};

exports.getOutfitById = async (req, res) => {
    const outfit = await Outfit.findById(req.params.id);
    res.json(outfit);
};

exports.createOutfit = async (req, res) => {
    const outfit = new Outfit(req.body);
    await outfit.save();
    res.json(outfit);
};

exports.updateOutfit = async (req, res) => {
    const outfit = await Outfit.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(outfit);
};

exports.deleteOutfit = async (req, res) => {
    await Outfit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
};
