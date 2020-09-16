const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.post('/signup', user.signup)

router.post('/login', user.login)

router.get('/get-customers', user.getCustomers)

module.exports = router;