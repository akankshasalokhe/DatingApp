const Gift = require('../models/giftModel');
const path = require('path');

const getGiftsController = async (req, res) => {
    await connectDB();

  try {
    const { category, search = '', page = 1, limit = 10 } = req.query;
    const query = {
      ...(category && category !== 'All Categories' ? { category } : {}),
      name: { $regex: search, $options: 'i' },
    };
    const total = await Gift.countDocuments(query);
    const gifts = await Gift.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({ gifts, total });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createGiftController = async (req, res) => {
    await connectDB();

  try {
    const { name, price, category,stockCount } = req.body;
    const image = req.file ? req.file.filename : '';


    const newGift = new Gift({ name, price, category, image,stockCount });
    await newGift.save();

    res.status(201).json({ message: 'Gift added successfully', gift: newGift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateGiftController = async (req, res) => {
    await connectDB();
  
  try {
    const { name, price, category,stockCount } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData = { name, price, category,stockCount };
    if (image) updateData.image = image;

    const updatedGift = await Gift.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedGift) return res.status(404).json({ error: 'Gift not found' });

    res.json({ message: 'Gift updated', gift: updatedGift });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteGiftController = async (req, res) => {
    await connectDB();
  
  try {
    const deleted = await Gift.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Gift not found' });
    res.json({ message: 'Gift deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getGiftsController,
  createGiftController,
  updateGiftController,
  deleteGiftController,
};
