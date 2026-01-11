const uploadMultiple = (fieldName, maxCount) => {
  return (req, res, next) => {
    // Simple placeholder middleware - just pass through
    next();
  };
};

module.exports = {
  uploadMultiple,
};