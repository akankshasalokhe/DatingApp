const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'UserCategory', required: true }
});

module.exports = mongoose.model('UserSubCategory', SubCategorySchema);
