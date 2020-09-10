const express = require('express');
const router = express.Router();
const order = require('../controllers/orderController');

router.route('/')
    .get(order.getOrders)
    .post(order.create)

router.get('/customer-orders/:id', order.getAllCustomerOrders)

router.get('/:id', order.fetchOrder)

module.exports = router;