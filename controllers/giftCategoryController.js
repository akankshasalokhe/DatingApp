const GiftCategory = require('../models/giftCategoryModel');

const getCategoriesController = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const total = await GiftCategory.countDocuments();
    const categories = await GiftCategory.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json({ categories, total });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const createCategoryController = async (req, res) => {
  const { name, subcategories = [] } = req.body;
  try {
    const exists = await GiftCategory.findOne({ name });
    if (exists) return res.status(400).json({ error: 'Category already exists' });

    const category = new GiftCategory({ name, subcategories });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const { name, subcategories } = req.body;
  try {
    const updated = await GiftCategory.findByIdAndUpdate(
      id,
      { name, subcategories },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

const deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await GiftCategory.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Category not found' });
    res.json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController
};
