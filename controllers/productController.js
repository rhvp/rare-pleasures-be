const Product = require('../models/product');
const AppError = require('../config/appError');
const jwt = require('jsonwebtoken');
const _ = require('underscore');

exports.create = async(req, res, next) => {
    try {
        let data = _.pick(req.body, ['name','description', 'price', 'stock', 'image']);
        if(data.stock > 0) data.available = true;
        const product = await Product.create(data);
        // add image upload to cloudinary
        return res.status(201).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        return next(error);
    }
}

exports.findAll = async(req, res, next) => {
    try {
        const customLabels = {
            docs: "products"
        };
        const options = {
            page: req.query.page,
            limit: req.query.perPage,
            sort: { createdAt: -1 },
            customLabels,
            collation: {
              locale: "en"
            }
        };
        Product.paginate({}, options, (err, products)=>{
            res.status(200).json({
                status: 'success',
                data: {...products}
            })
        })
    } catch (error) {
        return next(error);
    }
}

exports.findAvailable = async(req, res, next) => {
    try {
        const customLabels = {
            docs: "products"
        };
        const options = {
            page: req.query.page,
            limit: req.query.perPage,
            sort: { createdAt: -1 },
            customLabels,
            collation: {
              locale: "en"
            }
        };
        Product.paginate({available: true}, options, (err, products)=>{
            res.status(200).json({
                status: 'success',
                data: {...products}
            })
        })
    } catch (error) {
        return next(error);
    }
}

exports.fetch = async(req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!product) return next(new AppError('Product not found', 404));
        res.status(200).json({
            status: 'success',
            data: product
        })
        
    } catch (error) {
        return next(error);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let update = _.pick(req.body, ['name','description', 'price', 'stock', 'available']);
        const product = await Product.findByIdAndUpdate(req.params.id, update, {new: true});
        if(!product) return next(new AppError('Product not found', 404));
        
        res.status(200).json({
            status: 'success',
            data: product
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete = async(req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return next(new AppError('Product not found', 404));
        res.status(204).end();
    } catch (error) {
        return next(error);
    }
}