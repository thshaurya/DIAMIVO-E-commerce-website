const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: 1 });
  return sendSuccess(res, 200, 'Categories retrieved successfully', categories);
});

/**
 * @desc    Get single category by slug
 * @route   GET /api/categories/slug/:slug
 * @access  Public
 */
const getCategoryBySlug = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const category = await Category.findOne({ slug: slug.toLowerCase() });

  if (!category) {
    return sendError(res, 404, `Category not found with slug: ${slug}`);
  }

  return sendSuccess(res, 200, 'Category retrieved successfully', category);
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return sendError(res, 404, `Category not found with id: ${req.params.id}`);
  }

  return sendSuccess(res, 200, 'Category retrieved successfully', category);
});

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Public (Admin in security phase)
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name, slug, description, image, featured } = req.body;

  const categoryExists = await Category.findOne({
    $or: [{ name }, { slug: slug ? slug.toLowerCase() : '' }]
  });

  if (categoryExists) {
    return sendError(res, 400, 'Category with this name or slug already exists');
  }

  const category = await Category.create({
    name,
    slug: slug ? slug.toLowerCase() : name.toLowerCase().replace(/\s+/g, '-'),
    description,
    image,
    featured: featured !== undefined ? featured : true
  });

  return sendSuccess(res, 201, 'Category created successfully', category);
});

/**
 * @desc    Update category
 * @route   PUT /api/categories/:id
 * @access  Public (Admin in security phase)
 */
const updateCategory = asyncHandler(async (req, res) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return sendError(res, 404, `Category not found with id: ${req.params.id}`);
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  return sendSuccess(res, 200, 'Category updated successfully', category);
});

/**
 * @desc    Delete category
 * @route   DELETE /api/categories/:id
 * @access  Public (Admin in security phase)
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return sendError(res, 404, `Category not found with id: ${req.params.id}`);
  }

  await category.deleteOne();
  return sendSuccess(res, 200, 'Category deleted successfully', null);
});

module.exports = {
  getCategories,
  getCategoryBySlug,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};
