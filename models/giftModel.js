const mongoose = require('mongoose');

const giftSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, default: '' },
  category: { type: String, required: true },
  stockCount:{type:String, required:true},
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Gift', giftSchema);