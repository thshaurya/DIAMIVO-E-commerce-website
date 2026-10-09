/**
 * Async handler utility to wrap route handler functions
 * Eliminates boilerplate try/catch blocks by forwarding errors to Express next()
 * 
 * @param {Function} fn - Asynchronous route controller function
 * @returns {Function} Express route handler
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
