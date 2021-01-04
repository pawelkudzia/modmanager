import express from 'express';
import authController from '../controllers/authController.js';
import userController from '../controllers/userController.js';

// router
const router = express.Router();

// endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

router.route('/')
    .get(userController.getAllUsers);

export default router;
