const TermsConditions = require("../models/termsConditionsModel");


// Get Terms & Conditions
exports.getTermsAndConditions = async (req, res) => {
  try {
    const condition = await TermsConditions.findOne();
    res.json(condition);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save or Update Terms & Conditions
exports.saveTermsAndConditions = async (req, res) => {
  try {
    const { content } = req.body;

    let condition = await TermsConditions.findOne();
    if (condition) {
      condition.content = content;
      condition.updatedAt = Date.now();
      await condition.save();
    } else {
      condition = new TermsConditions({ content });
      await condition.save();
    }

    res.json({ message: "Terms & Conditions saved successfully", condition });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
