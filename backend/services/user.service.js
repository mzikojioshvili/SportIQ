import User from '../models/user.model.js';

export const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    return user;
};

export const redeemUserPrize = async (userId, prizeData) => {
    const { itemId, pointsCost, title, photo, firstName, lastName, phone, address } = prizeData;

    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.points < pointsCost) throw new Error('Not enough points');

    user.points -= pointsCost;
    user.claimedPrizes.push({ itemId, name: title, photo, pointsCost, firstName, lastName, phone, address });
    await user.save();

    return user;
};

export const submitUserQuizScore = async (userId, score, totalQuestions) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { $inc: { points: score * 30, xp: score * 50, quizzesCompleted: 1, streak: 1 } },
        { new: true }
    );
    if (!user) throw new Error('User not found');

    return {
        newXp: user.xp,
        newPoints: user.points,
        streak: user.streak,
        score,
        totalQuestions,
    };
};