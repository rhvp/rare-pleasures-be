const Product = require('../models/product');
const Category = require('../models/category');
const AppError = require('../config/appError');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'intelligent-innovations',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.create = async(req, res, next) => {
    try {
        let data = _.pick(req.body, ['name','description', 'price', 'published']);
        let {image} = req.body;
        const product = await Product.create(data);
        
        res.status(201).json({
            status: 'success',
            data: product
        })
        cloudinary.uploader.upload(image, async(error, result)=>{
            if(error) console.log('Error uploading image', error)
            else console.log(result.secure_url);
            await Product.updateOne({_id: product._id}, {image: result.secure_url});
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
            },
            populate: 'category'
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
            },
            populate: 'category'
        };
        Product.paginate({published: true}, options, (err, products)=>{
            res.status(200).json({
                status: 'success',
                data: {...products}
            })
        })
    } catch (error) {
        return next(error);
    }
}

exports.findByCategory = async(req, res, next) => {
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
            },
            populate: 'category'
        };
        Product.paginate({published: true, category: req.params.id}, options, (err, products)=>{
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
        const product = await Product.findById(req.params.id).populate('category');
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
        let update = _.pick(req.body, ['name','description', 'price', 'published']);
        let {image} = req.body;
        const product = await Product.findByIdAndUpdate(req.params.id, update, {new: true});
        if(!product) return next(new AppError('Product not found', 404));
        res.status(200).json({
            status: 'success',
            data: product
        })
        if(image) {
            cloudinary.uploader.upload(image, async(error, result)=>{
                if(error) console.log('Error uploading image', error)
                else console.log(result.secure_url);
                await Product.updateOne({_id: product._id}, {image: result.secure_url});
            })
        }
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