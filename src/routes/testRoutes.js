import express from 'express';
import catchAsync from '../utils/catchAsync.js';

// endpoint handlers
const apiTest = catchAsync(async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: `API is working: ${req.originalUrl}.`
    });
});

// router
const router = express.Router();

// endpoints
router.route('/').get(apiTest);

export default router;
