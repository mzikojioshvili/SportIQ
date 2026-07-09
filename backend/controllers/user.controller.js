import { getUserProfile, redeemUserPrize, submitUserQuizScore } from '../services/user.service.js';

export const getProfile = async (req, res) => {
    try {
        const user = await getUserProfile(req.user._id);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const redeemPrize = async (req, res) => {
    try {
        const user = await redeemUserPrize(req.user._id, req.body);
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const submitQuizScore = async (req, res) => {
    try {
        const { score, totalQuestions } = req.body;
        const result = await submitUserQuizScore(req.user._id, score, totalQuestions);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};