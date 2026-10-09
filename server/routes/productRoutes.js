const express = require('express');
const router = express.Router();
const {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// /api/products
router.route('/')
  .get(getProducts)
  .post(createProduct);

// /api/products/featured
router.route('/featured')
  .get(getFeaturedProducts);

// /api/products/category/:category
router.route('/category/:category')
  .get(getProductsByCategory);

// /api/products/:id
router.route('/:id')
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

module.exports = router;
