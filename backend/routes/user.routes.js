import express from 'express';
import { getProfile, redeemPrize, submitQuizScore } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/profile', authMiddleware, getProfile);
router.post('/redeem', authMiddleware, redeemPrize);
router.post('/quizzes/:id/submit', authMiddleware, submitQuizScore);

export default router;