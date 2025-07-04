const mongoose = require('mongoose');

const userCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  }
}, { timestamps: true });

module.exports = mongoose.model('UserCategory', userCategorySchema);