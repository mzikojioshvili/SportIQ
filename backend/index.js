import dotenv from 'dotenv';
import express from 'express';
import { connectToDB } from './configs/connectToDB.js';
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js"
import quizRoutes from "./routes/quiz.routes.js";

const app = express();
dotenv.config();

await connectToDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/quizzes', quizRoutes);

app.listen(4000, () => {
    console.log('Server is running on port http://localhost:4000');
})