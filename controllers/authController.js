const AppError = require('../config/appError');
const jwt = require('jsonwebtoken');

exports.userAuth = async(req, res, next) => {
    try {
        let auth = req.headers['authorization'];
        if(!auth) return next(new AppError('Please login to access this resource', 401));
        const authorized = jwt.verify(auth, process.env.JWT_SECRET);
        if(authorized) next();
        else return next(new AppError('Unauthorized. Token may have expired', 401));
    } catch (error) {
        return next(error);
    }
}