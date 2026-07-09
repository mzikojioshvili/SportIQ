import express from 'express';
import { getQuizzes, getQuizByIdHandler, getHomeQuizzesHandler } from '../controllers/quiz.controller.js';
import { submitQuizScore } from '../controllers/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', getQuizzes);
router.get("/home", getHomeQuizzesHandler);
router.get('/:id', getQuizByIdHandler);
router.post('/:id/submit', authMiddleware, submitQuizScore);

export default router;
