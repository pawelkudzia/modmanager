import express from 'express';
import authController from '../controllers/authController.js';
import gameController from '../controllers/gameController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(authController.protect, gameController.getAllGames)
    .post(authController.protect, authController.restrictTo('admin'), gameController.createGame);

router.route('/:id')
    .get(authController.protect, gameController.getGame)
    .patch(authController.protect, authController.restrictTo('admin'), gameController.updateGame)
    .delete(authController.protect, authController.restrictTo('admin'), gameController.deleteGame);

export default router;
