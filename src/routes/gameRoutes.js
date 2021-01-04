import express from 'express';
import gameController from '../controllers/gameController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(gameController.getAllGames)
    .post(gameController.createGame);

router.route('/:id')
    .get(gameController.getGame)
    .patch(gameController.updateGame)
    .delete(gameController.deleteGame);

export default router;
