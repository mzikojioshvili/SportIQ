import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
    key: { type: String, required: true },
    text: { type: String, required: true }
}, { _id: false });

const questionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    correctKey: { type: String, required: true },
    options: { type: [optionSchema], required: true }
}, { _id: false });

const quizSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    sport: { type: String, required: true },
    sportColor: { type: String },
    accent: { type: String },
    questionsCount: { type: Number, required: true },
    description: { type: String },
    cardBg: { type: String },
    equipmentImg: { type: String },
    questions: { type: [questionSchema], default: [] }
}, { timestamps: true });

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
