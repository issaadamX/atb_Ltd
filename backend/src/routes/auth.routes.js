const express = require('express');
const { login, getProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/login', login);

// Protected routes
router.get('/profile', protect, getProfile);

module.exports = router;
