const express = require("express");
const router = express.Router();
const {
  getPrivacyPolicy,
  savePrivacyPolicy,
} = require("../controllers/privacyPolicyController");

router.get("/getPrivacyPolicy", getPrivacyPolicy);
router.post("/savePrivacyPolicy", savePrivacyPolicy);

module.exports = router;
