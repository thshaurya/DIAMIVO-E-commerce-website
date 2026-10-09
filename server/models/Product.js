const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [120, 'Product name cannot exceed 120 characters']
    },
    slug: {
      type: String,
      required: [true, 'Product slug is required'],
      unique: true,
      lowercase: true,
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: [250, 'Short description cannot exceed 250 characters']
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative']
    },
    originalPrice: {
      type: Number,
      default: null,
      min: [0, 'Original price cannot be negative']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      lowercase: true
    },
    images: {
      type: [String],
      required: [true, 'At least one product image is required'],
      validate: [(val) => val.length > 0, 'Must have at least one image']
    },
    metal: {
      type: String,
      required: [true, 'Metal specification is required'],
      trim: true
    },
    diamondDetails: {
      carat: { type: Number, default: 0 },
      cut: { type: String, default: 'Round Brilliant' },
      color: { type: String, default: 'F' },
      clarity: { type: String, default: 'VS1' },
      certificate: { type: String, default: 'GIA Certified' }
    },
    gemstoneDetails: {
      stone: { type: String, default: '' },
      carat: { type: Number, default: 0 },
      origin: { type: String, default: '' }
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 10
    },
    isFeatured: {
      type: Boolean,
      default: false
    },
    isNewArrival: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 4.9,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5']
    },
    numReviews: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast search and filtering
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isFeatured: 1 });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
