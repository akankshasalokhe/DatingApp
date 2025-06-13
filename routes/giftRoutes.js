const express = require('express');
const router = express.Router();

const {
  getGiftsController,
  createGiftController,
  updateGiftController,
  deleteGiftController
} = require('../controllers/giftController');
const upload = require('../middlewares/upload');


router.get('/getAllGifts', getGiftsController);
router.post('/createGifts', upload.single('image'), createGiftController);
router.put('/updateGift/:id', upload.single('image'), updateGiftController);
router.delete('/deleteGift/:id', deleteGiftController);

module.exports = router;
