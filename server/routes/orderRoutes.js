const express = require('express');
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderByNumber,
  getOrderById,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder
} = require('../controllers/orderController');

// /api/orders
router.route('/')
  .post(createOrder)
  .get(getOrders);

// /api/orders/number/:orderNumber
router.route('/number/:orderNumber')
  .get(getOrderByNumber);

// /api/orders/:id
router.route('/:id')
  .get(getOrderById);

// /api/orders/:id/status
router.route('/:id/status')
  .patch(updateOrderStatus);

// /api/orders/:id/payment
router.route('/:id/payment')
  .patch(updatePaymentStatus);

// /api/orders/:id/cancel
router.route('/:id/cancel')
  .patch(cancelOrder);

module.exports = router;
