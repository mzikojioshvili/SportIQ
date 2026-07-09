import Quiz from '../models/quiz.model.js';

export const getAllQuizzes = async () => {
    return await Quiz.find({}, { questions: 0 });
};

export const getHomeQuizzes = async () => {
    return await Quiz.find({}).limit(6);
}

export const getQuizById = async (id) => {
    const quiz = await Quiz.findOne({ id });
    if (!quiz) throw new Error('Quiz not found');
    return quiz;
};
