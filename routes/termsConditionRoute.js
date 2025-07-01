const express = require("express");
const router = express.Router();
const {
  getTermsAndConditions,
  saveTermsAndConditions,
} = require("../controllers/termsConditionsController");

router.get("/getTermsAndConditions", getTermsAndConditions);
router.post("/saveTermsAndConditions", saveTermsAndConditions);

module.exports = router;
