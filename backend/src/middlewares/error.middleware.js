const { sendResponse } = require('../utils/response');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Prisma error handling
  if (err.code === 'P2002') {
    return sendResponse(res, 409, 'A record with this information already exists.');
  }

  if (err.code === 'P2025') {
    return sendResponse(res, 404, 'Record not found.');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return sendResponse(res, 401, 'Invalid token.');
  }

  if (err.name === 'TokenExpiredError') {
    return sendResponse(res, 401, 'Token expired.');
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  sendResponse(res, statusCode, message);
};

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFound };
