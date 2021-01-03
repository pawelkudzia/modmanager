import User from '../models/userModel.js';
import catchAsync from '../utils/catchAsync.js';
import jwt from 'jsonwebtoken';
import AppError from '../utils/appError.js';
import { promisify } from 'util';

// endpoint handlers
const register = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    createSendToken(newUser, 201, res);
});

const login = catchAsync(async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return next(new AppError('Email or password is wrong!', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !await user.correctPassword(password, user.password)) {
        return next(new AppError('Unauthorized Error!', 401));
    }

    createSendToken(user, 200, res);
});

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        secure: false,
        httpOnly: true
    });

    user.password = undefined;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: { user }
    });
};

const protect = catchAsync(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new AppError('Unauthorized Error!', 401));
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
        return next(new AppError('Unauthorized Error!', 401));
    }

    if (currentUser.changedPasswordAfter(decoded.iat)) {
        return next(new AppError('Unauthorized Error!', 401));
    }

    req.user = currentUser;

    next();
});

const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new AppError('Forbidden Error!', 403));
        }

        next();
    };
};

const authController = {
    register,
    login,
    protect,
    restrictTo
};

export default authController;
