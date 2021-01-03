import express from 'express';

// endpoint handlers
const apiTest = async (req, res) => {
    try {
        res.status(200).json({
            status: 'success',
            message: `API is working: ${req.originalUrl}.`
        });
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: 'Something went wrong.'
        });
    }
};

// router
const router = express.Router();

// endpoints
router.route('/').get(apiTest);

export default router;
