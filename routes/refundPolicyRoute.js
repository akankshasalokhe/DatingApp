const express = require("express");
const router = express.Router();
const {
  getRefundPolicy,
  saveRefundPolicy,
} = require("../controllers/refundPolicyController");

router.get("/getRefundPolicy", getRefundPolicy);
router.post("/saveRefundPolicy", saveRefundPolicy);

module.exports = router;
