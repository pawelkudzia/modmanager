import express from 'express';
import authController from '../controllers/authController.js';

// router
const router = express.Router();

// endpoints
router.post('/register', authController.register);
router.post('/login', authController.login);

export default router;
