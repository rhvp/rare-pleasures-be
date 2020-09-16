const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');

router.route('/')
    .get(order.getOrders)
    .post(order.create)

router.get('/customer-orders/:id', order.getAllCustomerOrders)

router.route('/:id')
    .get(order.fetchOrder)
    .patch(order.updateStatus)

module.exports = router;