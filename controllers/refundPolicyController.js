const RefundPolicy = require("../models/refundPolicyModel");

// Get Refund Policy
exports.getRefundPolicy = async (req, res) => {
  try {
    const refundpolicy = await RefundPolicy.findOne();
    res.json(refundpolicy);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Save or Update Refund Policy
exports.saveRefundPolicy = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Refund policy content is required." });
    }

    let refundpolicy = await RefundPolicy.findOne();
    if (refundpolicy) {
      refundpolicy.content = content;
      refundpolicy.updatedAt = Date.now();
      await refundpolicy.save();
    } else {
      refundpolicy = new RefundPolicy({ content });
      await refundpolicy.save();
    }

    res.json({ message: "Refund policy saved successfully", refundpolicy });
  } catch (err) {
    console.error("Error saving/updating Refund Policy:", err); // 👈 log error
    res.status(500).json({ message: "Server Error" });
  }
};

