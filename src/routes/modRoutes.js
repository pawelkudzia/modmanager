import express from 'express';
import modController from '../controllers/modController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(modController.getAllMods)
    .post(modController.createMod);

router.route('/:id')
    .get(modController.getMod)
    .patch(modController.updateMod)
    .delete(modController.deleteMod);

export default router;
