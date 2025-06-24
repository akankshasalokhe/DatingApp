const express = require('express');
const { likeUserController } = require('../controllers/matchController');
const router = express.Router();

// POST /api/match
router.post('/likeUser', likeUserController);

module.exports = router;
