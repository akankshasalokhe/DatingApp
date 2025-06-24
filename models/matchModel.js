const mongoose = require('mongoose');

const matchSchema = new mongoose.Schema({
  liker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Who liked
  liked: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Who was liked
  matched: { type: Boolean, default: false },                    // True when mutual
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Match', matchSchema);
