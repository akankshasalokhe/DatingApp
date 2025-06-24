const express = require('express');
const {
  getUserCategoriesController,
  createUserCategoryController,
  updateUserCategoryController,
  deleteUserCategoryController,
  getAllCategories,
} = require('../controllers/userController');

const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/getUserCategory', getUserCategoriesController);
router.get('/getAllCategories',getAllCategories)
router.post('/createUserCategory', createUserCategoryController);
router.put('/updateUserCategory/:id', updateUserCategoryController);
router.delete('/deleteUserCategory/:id', deleteUserCategoryController);

module.exports = router;
