const mongoose = require('mongoose');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Get all products with filtering, search, sorting and pagination
 * @route   GET /api/products
 * @access  Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const {
    category,
    search,
    minPrice,
    maxPrice,
    sort,
    page = 1,
    limit = 12
  } = req.query;

  // Build query filter
  const filter = {};

  if (category && category.toLowerCase() !== 'all') {
    filter.category = category.toLowerCase().trim();
  }

  if (search && search.trim() !== '') {
    filter.$or = [
      { name: { $regex: search.trim(), $options: 'i' } },
      { description: { $regex: search.trim(), $options: 'i' } },
      { metal: { $regex: search.trim(), $options: 'i' } }
    ];
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Build sort options
  let sortOption = { isFeatured: -1, createdAt: -1 };
  if (sort === 'price-asc') {
    sortOption = { price: 1 };
  } else if (sort === 'price-desc') {
    sortOption = { price: -1 };
  } else if (sort === 'newest') {
    sortOption = { createdAt: -1 };
  } else if (sort === 'rating') {
    sortOption = { rating: -1 };
  }

  // Pagination
  const pageNumber = Math.max(1, parseInt(page, 10));
  const pageSize = Math.max(1, parseInt(limit, 10));
  const skip = (pageNumber - 1) * pageSize;

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(pageSize);

  const totalPages = Math.ceil(total / pageSize);

  return sendSuccess(res, 200, 'Products retrieved successfully', products, {
    total,
    page: pageNumber,
    totalPages,
    limit: pageSize
  });
});

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  return sendSuccess(res, 200, 'Featured products retrieved successfully', products);
});

/**
 * @desc    Get products by category slug
 * @route   GET /api/products/category/:category
 * @access  Public
 */
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({
    category: category.toLowerCase().trim()
  }).sort({ createdAt: -1 });

  return sendSuccess(
    res,
    200,
    `Products for category '${category}' retrieved successfully`,
    products
  );
});

/**
 * @desc    Get single product by ID or Slug
 * @route   GET /api/products/:id
 * @access  Public
 */
const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  }

  if (!product) {
    product = await Product.findOne({ slug: id.toLowerCase() });
  }

  if (!product) {
    return sendError(res, 404, `Product not found with identifier: ${id}`);
  }

  return sendSuccess(res, 200, 'Product retrieved successfully', product);
});

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Public (Admin in security phase)
 */
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    slug,
    description,
    shortDescription,
    price,
    originalPrice,
    category,
    images,
    metal,
    diamondDetails,
    gemstoneDetails,
    stock,
    isFeatured,
    isNewArrival
  } = req.body;

  const generatedSlug = slug
    ? slug.toLowerCase()
    : name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const productExists = await Product.findOne({ slug: generatedSlug });
  if (productExists) {
    return sendError(res, 400, 'A product with this name or slug already exists');
  }

  const product = await Product.create({
    name,
    slug: generatedSlug,
    description,
    shortDescription,
    price,
    originalPrice,
    category: category ? category.toLowerCase() : 'rings',
    images,
    metal,
    diamondDetails,
    gemstoneDetails,
    stock: stock !== undefined ? stock : 10,
    isFeatured: Boolean(isFeatured),
    isNewArrival: Boolean(isNewArrival)
  });

  return sendSuccess(res, 201, 'Product created successfully', product);
});

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Public (Admin in security phase)
 */
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  } else {
    product = await Product.findOne({ slug: id.toLowerCase() });
  }

  if (!product) {
    return sendError(res, 404, `Product not found with identifier: ${id}`);
  }

  product = await Product.findByIdAndUpdate(product._id, req.body, {
    new: true,
    runValidators: true
  });

  return sendSuccess(res, 200, 'Product updated successfully', product);
});

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Public (Admin in security phase)
 */
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let product = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    product = await Product.findById(id);
  } else {
    product = await Product.findOne({ slug: id.toLowerCase() });
  }

  if (!product) {
    return sendError(res, 404, `Product not found with identifier: ${id}`);
  }

  await product.deleteOne();
  return sendSuccess(res, 200, 'Product deleted successfully', null);
});

module.exports = {
  getProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
