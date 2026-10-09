/**
 * Standardized API Response Utilities
 */

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (default: 200)
 * @param {String} message - Human-readable success message
 * @param {*} data - Payload to send
 * @param {Object} meta - Optional pagination/metadata
 */
const sendSuccess = (res, statusCode = 200, message = 'Success', data = null, meta = undefined) => {
  const response = {
    success: true,
    message,
    data
  };

  if (meta !== undefined) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {Number} statusCode - HTTP status code (default: 500)
 * @param {String} message - Human-readable error message
 * @param {*} errors - Detailed error array or object
 */
const sendError = (res, statusCode = 500, message = 'Internal Server Error', errors = null) => {
  const response = {
    success: false,
    message
  };

  if (errors !== null) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendError
};
