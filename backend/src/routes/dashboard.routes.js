const express = require('express');
const {
  getStats,
  getRecentAppointments,
  getAppointmentStats,
} = require('../controllers/dashboard.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// All dashboard routes are protected
router.get('/stats', protect, getStats);
router.get('/recent-appointments', protect, getRecentAppointments);
router.get('/appointment-stats', protect, getAppointmentStats);

module.exports = router;
