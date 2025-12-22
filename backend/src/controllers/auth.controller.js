const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin user
    const admin = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!admin) {
      return sendError(res, 401, 'Invalid credentials');
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return sendError(res, 401, 'Invalid credentials');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    sendSuccess(res, 'Login successful', { token, admin: { id: admin.id, username: admin.username, role: admin.role } });
  } catch (error) {
    console.error('Login error:', error);
    sendError(res, 500, 'Server error');
  }
};

const getProfile = async (req, res) => {
  try {
    const admin = await prisma.adminUser.findUnique({
      where: { id: req.user.id },
      select: { id: true, username: true, role: true, createdAt: true },
    });

    if (!admin) {
      return sendError(res, 404, 'Admin not found');
    }

    sendSuccess(res, 'Profile retrieved successfully', admin);
  } catch (error) {
    console.error('Get profile error:', error);
    sendError(res, 500, 'Server error');
  }
};

module.exports = {
  login,
  getProfile,
};
