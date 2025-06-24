const UserSubCategory = require('../models/userSubCategoriesModel');


const createUserSubCategoryController = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: 'Name and category are required.' });
    }

    const newSubCategory = new UserSubCategory({ name, category });
    await newSubCategory.save();

    res.status(201).json(newSubCategory);
  } catch (error) {
    console.error('Create SubCategory Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getAllUserSubCategoriesController = async (req, res) => {
  try {
    const subcategories = await UserSubCategory.find().populate('category', 'name');
    res.status(200).json(subcategories);
  } catch (error) {
    console.error('Fetch SubCategories Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserSubCategoryByIdController = async (req, res) => {
  try {
    const subcategory = await UserSubCategory.findById(req.params.id).populate('category', 'name');
    if (!subcategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    console.error('Get SubCategory Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateUserSubCategoryController = async (req, res) => {
  try {
    const { name, category } = req.body;

    const subcategory = await UserSubCategory.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    );

    if (!subcategory) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json(subcategory);
  } catch (error) {
    console.error('Update SubCategory Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteUserSubCategoryController = async (req, res) => {
  try {
    const deleted = await UserSubCategory.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'SubCategory not found' });
    }

    res.status(200).json({ message: 'SubCategory deleted successfully' });
  } catch (error) {
    console.error('Delete SubCategory Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports={ createUserSubCategoryController,getAllUserSubCategoriesController,getUserSubCategoryByIdController,updateUserSubCategoryController,deleteUserSubCategoryController }
