const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// /api/categories
router.route('/')
  .get(getCategories)
  .post(createCategory);

// /api/categories/slug/:slug
router.route('/slug/:slug')
  .get(getCategoryBySlug);

// /api/categories/:id
router.route('/:id')
  .get(getCategoryById)
  .put(updateCategory)
  .delete(deleteCategory);

module.exports = router;
