const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment,
  acceptAppointment,
  declineAppointment,
  postponeAppointment,
} = require('../controllers/appointment.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public routes
router.post('/', createAppointment);

// Protected routes (Admin only)
router.get('/', protect, getAppointments);
router.get('/:id', protect, getAppointment);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

// Specific admin actions
router.put('/:id/accept', protect, acceptAppointment);
router.put('/:id/decline', protect, declineAppointment);
router.put('/:id/postpone', protect, postponeAppointment);

module.exports = router;
