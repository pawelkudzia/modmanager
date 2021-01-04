import User from '../models/userModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import catchAsync from '../utils/catchAsync.js';

// endpoint handlers
const getAllUsers = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const users = await features.query;

    res.status(200).json({
        status: 'success',
        results: users.length,
        data: { users }
    });
});

const getUser = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new AppError('No user found with this id!', 404));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });
});

const userController = {
    getAllUsers,
    getUser
};

export default userController;
