const sendResponse = (res, statusCode = 200, message = '', data = null) => {
  const response = {
    success: statusCode >= 200 && statusCode < 300,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
};

const sendError = (res, statusCode = 500, message = 'Internal server error', errors = null) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

const sendSuccess = (res, message = 'Success', data = null, statusCode = 200) => {
  return sendResponse(res, statusCode, message, data);
};

module.exports = {
  sendResponse,
  sendError,
  sendSuccess,
};
