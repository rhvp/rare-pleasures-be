const User = require('../models/user');
const Token = require('../models/token');
const AppError = require('../config/appError');
const jwt = require('jsonwebtoken');
const _ = require('underscore');
const bcrypt = require('bcryptjs');


exports.signup = async(req, res, next) => {
    try {
        let data = _.pick(req.body, ['firstname', 'lastname', 'business_name', 'email', 'phone', 'bank', 'nuban', 'address']);
        const userExists = await User.findOne({email: data.email});
        if(userExists) return next(new AppError('User already registered', 409));
        let {password} = req.body;
        let hashedPassword = bcrypt.hashSync(password, 12);
        data.password = hashedPassword;
        const user = await User.create(data);
        res.status(201).json({
            status: 'success',
            data: user
        })
    } catch (error) {
        return next(error);
    }
}

exports.login = async(req, res, next) => {
    try {
        let {email, password} = req.body;
        const user = await User.findOne({email: email});
        if(!user) return next(new AppError('User not found', 404));
        let passwordCorrect = bcrypt.compareSync(password, user.password);
        if(!passwordCorrect) return next(new AppError('Incorrect email/password match', 401));
        let signature = {
            id: user._id,
            email: user.email
        }
        let token = jwt.sign(signature, process.env.JWT_SECRET);
        await Token.create({user: user._id, token: token});
        const cookieOptions = {
            expires: new Date(
                Date.now() + 86400000
            ),
            httpOnly: true
        };
        if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
        res.cookie('jwt', token, cookieOptions);
        user.password = undefined;
        res.status(200).json({
            status: 'success',
            data: user,
            token: token
        })
    } catch (error) {
        return next(error);
    }
}