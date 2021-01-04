import express from 'express';
import gameController from '../controllers/gameController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(gameController.getAllGames)
    .post(gameController.createGame);

router.route('/:id')
    .get(gameController.getGame);

export default router;
