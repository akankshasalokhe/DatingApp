const PrivacyPolicy = require("../models/privacyPolicyModel");

// Get Privacy Policy
exports.getPrivacyPolicy = async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    res.json(policy);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save or Update Privacy Policy
exports.savePrivacyPolicy = async (req, res) => {
  try {
    const { content } = req.body;

    let policy = await PrivacyPolicy.findOne();
    if (policy) {
      policy.content = content;
      policy.updatedAt = Date.now();
      await policy.save();
    } else {
      policy = new PrivacyPolicy({ content });
      await policy.save();
    }

    res.json({ message: "Privacy policy saved successfully", policy });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
