const express = require('express');
const {
  getCategoriesController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryController,
} = require('../controllers/giftCategoryController');

const { isAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/getGiftCategory', getCategoriesController);
router.post('/createGiftCategory', createCategoryController);
router.put('/updateGiftCategory/:id', updateCategoryController);
router.delete('/deleteGiftCategory/:id', deleteCategoryController);

module.exports = router;
