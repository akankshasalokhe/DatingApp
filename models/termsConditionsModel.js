const mongoose = require("mongoose");

const TermsConditionsSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Terms&Conditions", TermsConditionsSchema);