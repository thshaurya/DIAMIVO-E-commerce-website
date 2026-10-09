const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getProfile,
  updateProfile
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// /api/auth/register
router.post('/register', registerUser);

// /api/auth/login
router.post('/login', loginUser);

// /api/auth/profile  (protected)
router.route('/profile')
  .get(protect, getProfile)
  .put(protect, updateProfile);

module.exports = router;
