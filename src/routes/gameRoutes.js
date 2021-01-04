import express from 'express';
import gameController from '../controllers/gameController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(gameController.getAllGames);

export default router;
