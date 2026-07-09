import mongoose from "mongoose";

const claimedPrizeSchema = new mongoose.Schema(
    {
        itemId: { type: String, required: true },
        name: { type: String, required: true },
        photo: { type: String },
        category: { type: String },
        pointsCost: { type: Number, required: true },
        firstName: String,
        lastName: String,
        phone: String,
        address: String,
        date: { type: Date, default: Date.now },
    },
    { _id: true }
);

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },

        lastName: {
            type: String,
            required: true,
        },

        dateOfBirth: {
            type: Date,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 8,
            select: false,
        },
        points: { type: Number, default: 0 },
        xp: { type: Number, default: 0 },
        quizzesCompleted: { type: Number, default: 0 },
        streak: { type: Number, default: 0 },
        claimedPrizes: { type: [claimedPrizeSchema], default: [] },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;