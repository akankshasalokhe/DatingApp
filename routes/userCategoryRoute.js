const express = require('express');
const {
  getUserCategoriesController,
  createUserCategoryController,
  updateUserCategoryController,
  deleteUserCategoryController,
} = require('../controllers/userController');

const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/getUserCategory', getUserCategoriesController);
router.post('/createUserCategory', createUserCategoryController);
router.put('/updateUserCategory/:id', updateUserCategoryController);
router.delete('/deleteUserCategory/:id', deleteUserCategoryController);

module.exports = router;
