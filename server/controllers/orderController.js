const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const { sendSuccess, sendError } = require('../utils/apiResponse');

/**
 * Generate a unique human-friendly order tracking number
 * Example: DMV-2026-94821
 */
const generateOrderNumber = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `DMV-${timestamp}-${random}`;
};

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Public
 */
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'cod', notes } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return sendError(res, 400, 'Order must contain at least one item');
  }

  if (!shippingAddress || !shippingAddress.name || !shippingAddress.email || !shippingAddress.address) {
    return sendError(res, 400, 'Incomplete shipping address provided');
  }

  // Verify each product, check stock, and calculate subtotal using current DB prices
  let subtotal = 0;
  const verifiedItems = [];

  for (const item of items) {
    const productId = item.product || item._id;
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendError(res, 400, `Invalid product ID: ${productId}`);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return sendError(res, 404, `Product '${item.name || productId}' was not found`);
    }

    const requestedQty = Math.max(1, parseInt(item.quantity, 10) || 1);
    if (product.stock < requestedQty) {
      return sendError(
        res,
        400,
        `Insufficient stock for '${product.name}'. Available: ${product.stock}, requested: ${requestedQty}`
      );
    }

    const itemPrice = product.price; // Trust only database price
    subtotal += itemPrice * requestedQty;

    verifiedItems.push({
      product: product._id,
      name: product.name,
      slug: product.slug,
      price: itemPrice,
      quantity: requestedQty,
      image: product.images && product.images.length > 0 ? product.images[0] : ''
    });
  }

  // Shipping logic: Free shipping over ₹50,000, otherwise ₹499
  const shippingPrice = subtotal >= 50000 ? 0 : 499;
  const taxPrice = 0; // Included in luxury MSRP
  const totalPrice = subtotal + shippingPrice + taxPrice;

  const orderNumber = generateOrderNumber();

  // Create order
  const order = await Order.create({
    orderNumber,
    items: verifiedItems,
    shippingAddress,
    paymentMethod,
    paymentStatus: paymentMethod === 'cod' ? 'pending' : 'completed',
    orderStatus: 'confirmed',
    subtotal,
    shippingPrice,
    taxPrice,
    totalPrice,
    notes: notes || ''
  });

  // Decrement stock for each product
  for (const item of verifiedItems) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  return sendSuccess(res, 201, 'Order created successfully', order);
});

/**
 * @desc    Get all orders (admin or list)
 * @route   GET /api/orders
 * @access  Public
 */
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  return sendSuccess(res, 200, 'Orders retrieved successfully', orders);
});

/**
 * @desc    Get order by order number (for order tracking)
 * @route   GET /api/orders/number/:orderNumber
 * @access  Public
 */
const getOrderByNumber = asyncHandler(async (req, res) => {
  const { orderNumber } = req.params;
  const order = await Order.findOne({
    orderNumber: orderNumber.trim().toUpperCase()
  });

  if (!order) {
    return sendError(res, 404, `Order with number '${orderNumber}' not found`);
  }

  return sendSuccess(res, 200, 'Order retrieved successfully', order);
});

/**
 * @desc    Get order by ID
 * @route   GET /api/orders/:id
 * @access  Public
 */
const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let order = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id);
  } else {
    order = await Order.findOne({ orderNumber: id.trim().toUpperCase() });
  }

  if (!order) {
    return sendError(res, 404, `Order not found with ID: ${id}`);
  }

  return sendSuccess(res, 200, 'Order retrieved successfully', order);
});

/**
 * @desc    Update order status
 * @route   PATCH /api/orders/:id/status
 * @access  Public (Admin in security phase)
 */
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!validStatuses.includes(orderStatus)) {
    return sendError(res, 400, `Invalid order status. Must be one of: ${validStatuses.join(', ')}`);
  }

  let order = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id);
  } else {
    order = await Order.findOne({ orderNumber: id.trim().toUpperCase() });
  }

  if (!order) {
    return sendError(res, 404, `Order not found with ID: ${id}`);
  }

  // If status is being updated to delivered, record delivery timestamp
  if (orderStatus === 'delivered' && !order.deliveredAt) {
    order.deliveredAt = new Date();
  }

  // If status is being updated to cancelled, restore stock
  if (orderStatus === 'cancelled' && order.orderStatus !== 'cancelled') {
    order.cancelledAt = new Date();
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: item.quantity }
      });
    }
  }

  order.orderStatus = orderStatus;
  await order.save();

  return sendSuccess(res, 200, 'Order status updated successfully', order);
});

/**
 * @desc    Update order payment status
 * @route   PATCH /api/orders/:id/payment
 * @access  Public
 */
const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { paymentStatus } = req.body;

  const validStatuses = ['pending', 'completed', 'failed'];
  if (!validStatuses.includes(paymentStatus)) {
    return sendError(res, 400, `Invalid payment status. Must be one of: ${validStatuses.join(', ')}`);
  }

  let order = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id);
  } else {
    order = await Order.findOne({ orderNumber: id.trim().toUpperCase() });
  }

  if (!order) {
    return sendError(res, 404, `Order not found with ID: ${id}`);
  }

  order.paymentStatus = paymentStatus;
  await order.save();

  return sendSuccess(res, 200, 'Order payment status updated successfully', order);
});

/**
 * @desc    Cancel order and restore product stock
 * @route   PATCH /api/orders/:id/cancel
 * @access  Public
 */
const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let order = null;
  if (mongoose.Types.ObjectId.isValid(id)) {
    order = await Order.findById(id);
  } else {
    order = await Order.findOne({ orderNumber: id.trim().toUpperCase() });
  }

  if (!order) {
    return sendError(res, 404, `Order not found with ID: ${id}`);
  }

  if (order.orderStatus === 'cancelled') {
    return sendError(res, 400, 'Order is already cancelled');
  }

  if (order.orderStatus === 'delivered') {
    return sendError(res, 400, 'Delivered orders cannot be cancelled');
  }

  // Restore inventory stock
  for (const item of order.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: item.quantity }
    });
  }

  order.orderStatus = 'cancelled';
  order.cancelledAt = new Date();
  await order.save();

  return sendSuccess(res, 200, 'Order cancelled and stock restored successfully', order);
});

module.exports = {
  createOrder,
  getOrders,
  getOrderByNumber,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder
};
