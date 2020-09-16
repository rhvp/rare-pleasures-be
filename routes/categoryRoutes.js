const express = require('express');
const router = express.Router();
const category = require('../controllers/categoryController');
const auth = require('../controllers/authController');

router.route('/')
    .post(auth.userAuth, category.create)
    .get(category.get)

router.route('/:id')
    .get(category.fetch)
    .patch(auth.userAuth, category.edit)
    .delete(auth.userAuth, category.delete)

module.exports = router;