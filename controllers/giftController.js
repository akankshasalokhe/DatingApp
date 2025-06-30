const Gift = require('../models/giftModel');
const connectDB = require('../config/db'); // Ensure this is your DB connection utility

// GET: Fetch gifts with optional category, search, pagination
const getGiftsController = async (req, res) => {
  await connectDB();
  try {
    const { category, search = '', page = 1, limit = 10 } = req.query;

    const query = {
      ...(category && category !== 'All Categories' && { category }),
      name: { $regex: search, $options: 'i' },
    };

    const total = await Gift.countDocuments(query);
    const gifts = await Gift.find(query)
      .sort({ createdAt: -1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

    res.status(200).json({ gifts, total });
  } catch (err) {
    console.error('Error fetching gifts:', err);
    res.status(500).json({ message: 'Failed to fetch gifts', error: err.message });
  }
};

// POST: Create a new gift
const createGiftController = async (req, res) => {
  await connectDB();
  try {
    const { name, price, category } = req.body;
const image = req.file ? `https://datingapp-p2d5.onrender.com/uploads/${req.file.filename}` : '';

    if (!name || !price || !category) {
      return res.status(400).json({ message: 'Name, price, and category are required.' });
    }

    const newGift = new Gift({ name, price, category, image });
    await newGift.save();

    res.status(201).json({ message: 'Gift added successfully', gift: newGift });
  } catch (err) {
    console.error('Error creating gift:', err);
    res.status(500).json({ error: err.message });
  }
};

// PUT: Update gift by ID
const updateGiftController = async (req, res) => {
  await connectDB();
  try {
    const { name, price, category } = req.body;
    const image = req.file ? `https://datingapp-p2d5.onrender.com/uploads/${req.file.filename}` : undefined;

    const updateData = { name, price, category };
    if (image) updateData.image = image;

    const updatedGift = await Gift.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedGift) {
      return res.status(404).json({ message: 'Gift not found' });
    }

    res.status(200).json({ message: 'Gift updated successfully', gift: updatedGift });
  } catch (err) {
    console.error('Error updating gift:', err);
    res.status(500).json({ error: err.message });
  }
};

// DELETE: Remove gift by ID
const deleteGiftController = async (req, res) => {
  await connectDB();
  try {
    const deletedGift = await Gift.findByIdAndDelete(req.params.id);
    if (!deletedGift) {
      return res.status(404).json({ message: 'Gift not found' });
    }
    res.status(200).json({ message: 'Gift deleted successfully' });
  } catch (err) {
    console.error('Error deleting gift:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getGiftsController,
  createGiftController,
  updateGiftController,
  deleteGiftController,
};
