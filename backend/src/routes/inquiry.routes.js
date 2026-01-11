const express = require('express');
const inquiryController = require('../controllers/inquiry.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// Public route - create inquiry from contact form
router.post('/', inquiryController.createInquiry);

// Protected admin routes
router.get('/', protect, inquiryController.getAllInquiries);
router.get('/:id', protect, inquiryController.getInquiryById);
router.put('/:id/status', protect, inquiryController.updateInquiryStatus);
router.delete('/:id', protect, inquiryController.deleteInquiry);

module.exports = router;