const protect = (req, res, next) => {
  // Simplified auth - just pass through for now
  req.user = { id: 1, username: 'admin', role: 'admin' };
  next();
};

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Admin role required.'
    });
  }
};

module.exports = {
  protect,
  requireAdmin,
};