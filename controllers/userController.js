const connectDB = require('../config/db');
const UserCategory = require('../models/userCategoryModel');

const getUserCategoriesController = async (req, res) => {
    await connectDB();

  const { page = 1, limit = 10 } = req.query;
  try {
    const total = await UserCategory.countDocuments();
    const categories = await UserCategory.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ categories, total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createUserCategoryController = async (req, res) => {
    await connectDB();

  const { name = [] } = req.body;
  try {
    const exists = await UserCategory.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Category already exists' });

    const category = new UserCategory({ name});
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateUserCategoryController = async (req, res) => {
    await connectDB();

  const { id } = req.params;
  const { name } = req.body;
  try {
    const updated = await UserCategory.findByIdAndUpdate(
      id,
      { name},
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteUserCategoryController = async (req, res) => {
    await connectDB();

  const { id } = req.params;
  try {
    const deleted = await UserCategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getUserCategoriesController,
  createUserCategoryController,
  updateUserCategoryController,
  deleteUserCategoryController
};
