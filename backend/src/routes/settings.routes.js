const express = require('express');
const settingsController = require('../controllers/settings.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', protect, settingsController.getSettings);
router.put('/', protect, settingsController.updateSettings);

module.exports = router;