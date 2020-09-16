const AppError = require('../config/appError');
const Category = require('../models/category');

exports.create = async(req, res, next) => {
    try {
        let {name} = req.body;
        const category = await Category.create({name: name});
        res.status(201).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        return next(error);
    }
}

exports.edit = async(req, res, next) => {
    try {
        let {name} = req.body;
        const category = await Category.findByIdAndUpdate(req.params.id, {name: name}, {new: true});
        res.status(200).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        return next(error);
    }
}

exports.get = async(req, res, next) => {
    try {
        const data = await Category.find();
        res.status(200).json({
            status: 'success',
            data: data
        })
    } catch (error) {
        return next(error);
    }
}

exports.fetch = async(req, res, next) => {
    try {
        let category = await Category.findById(req.params.id);
        if(!category) return next(new AppError('Category not found', 404));
        res.status(200).json({
            status: 'success',
            data: category
        })
    } catch (error) {
        return next(error);
    }
}

exports.delete = async(req, res, next) => {
    try {
        let category = await Category.findByIdAndDelete(req.params.id)
        if(category) return next(new AppError('Category not found', 404));
        res.status(204).end();
    } catch (error) {
        return next(error);
    }
}
