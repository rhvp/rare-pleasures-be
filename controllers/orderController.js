const Order = require('../models/order');
const AppError = require('../config/appError');
const Customer = require('../models/customer');
const _ = require('underscore');
const jwt = require('jsonwebtoken');
const sendEmail = require('../config/nodemailer');


exports.create = async(req, res, next) => {
    try {
        let { amount, products} = req.body;
        let customer_data = _.pick(req.body, ['name', 'email', 'phone', 'address']);
        let customer = await Customer.findOne({email: customer_data.email});
        if(!customer) customer = await Customer.create(customer_data);
        let orderData = {
            products,
            amount,
            customer: customer._id
        }
        const order = await Order.create(orderData);
        res.status(201).json({
            status: 'success',
            message: 'Order Created',
            data: order
        })
        let msgOptions = {
            email: customer.email,
            from: 'Starter Pack <hello@9id.com.ng>',
            subject: 'Order Recieved',
            message: `<p>Hello ${customer.name},</p>
            <p>Your order has been recieved and is currently being processed</p>
            `
        }
        sendEmail(msgOptions).then(done=>console.log('Mail sent to customer')).catch(err=>console.log('Error sending email', err))
    } catch (error) {
        return next(error);
    }
}

exports.getAllCustomerOrders = async(req, res, next) => {
    try {
        const orders = await Order.find({customer: req.params.id}).populate('customer');
        res.status(200).json({
            status: 'success',
            count: orders.length,
            data: orders
        })
    } catch (error) {
        return next(error);
    }
}

exports.getOrders = async(req, res, next) => {
    try {
        const orders = await Order.find().populate('customer');
        res.status(200).json({
            status: 'success',
            count: orders.length,
            data: orders
        })
    } catch (error) {
        return next(error);
    }
}

exports.fetchOrder = async(req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('customer products.product');
        if(!order) return next(new AppError('Order not found', 404));
        res.status(200).json({
            status: 'success',
            data: order
        })
    } catch (error) {
        return next(error);
    }
}

exports.updateStatus = async(req, res, next) => {
    try {
        let {status} = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, {status: status}, {new: true});
        if(!order) return next(new AppError('Order not found', 404));
        res.status(200).json({
            status: 'success',
            data: order
        })
    } catch (error) {
        return next(error);
    }
}