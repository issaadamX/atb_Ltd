const jwt = require('jsonwebtoken');
const prisma = require('../config/db');
const { sendError } = require('../utils/response');

const protect = async (req, res, next) => {
  try {
    let token;

    // Check for token in header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 401, 'Not authorized, no token');
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from token
      const admin = await prisma.adminUser.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true, role: true },
      });

      if (!admin) {
        return sendError(res, 401, 'Not authorized, admin not found');
      }

      req.user = admin;
      next();
    } catch (error) {
      return sendError(res, 401, 'Not authorized, token failed');
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    return sendError(res, 500, 'Server error');
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return sendError(res, 403, 'Access denied. Admin role required.');
  }
};

module.exports = {
  protect,
  requireAdmin,
};
