const express = require('express');
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/project.controller');
const { protect } = require('../middlewares/auth.middleware');
const { uploadMultiple } = require('../middlewares/upload.middleware');

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/:id', getProject);

// Protected routes (Admin only)
router.post('/', protect, uploadMultiple('images', 5), createProject);
router.put('/:id', protect, uploadMultiple('images', 5), updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
