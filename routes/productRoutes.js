const express = require('express');
const router = express.Router();
const product = require('../controllers/productController');
const auth = require('../controllers/authController');

router.route('/')
    .post(auth.userAuth, product.create)
    .get(product.findAll)

router.get('/get-by-category/:id', product.findByCategory)

router.get('/published', product.findAvailable)

router.route('/:id')
    .patch(auth.userAuth, product.edit)
    .delete(auth.userAuth, product.delete)
    .get(product.fetch)   

module.exports = router;