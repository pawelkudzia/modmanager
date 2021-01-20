import express from 'express';
import authController from '../controllers/authController.js';
import modController from '../controllers/modController.js';

// router
const router = express.Router();

// endpoints
router.route('/')
    .get(authController.protect, modController.getAllMods)
    .post(authController.protect, modController.createMod);

router.route('/:id')
    .get(authController.protect, modController.getMod)
    .patch(authController.protect, modController.updateMod)
    .delete(authController.protect, modController.deleteMod);

export default router;
