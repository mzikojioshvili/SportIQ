import { getAllQuizzes, getQuizById, getHomeQuizzes } from '../services/quiz.service.js';

export const getQuizzes = async (req, res) => {
    try {
        const quizzes = await getAllQuizzes();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getHomeQuizzesHandler = async (req, res) => {
    try {
        const quizzes = await getHomeQuizzes();
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getQuizByIdHandler = async (req, res) => {
    try {
        const quiz = await getQuizById(req.params.id);
        res.json(quiz);
    } catch (err) {
        const status = err.message === 'Quiz not found' ? 404 : 500;
        res.status(status).json({ message: err.message });
    }
};
