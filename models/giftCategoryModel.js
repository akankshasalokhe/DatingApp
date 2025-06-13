const mongoose = require('mongoose');

const giftCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [{
    type: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('GiftCategory', giftCategorySchema);
