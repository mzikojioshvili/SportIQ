import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";

export const registerUser = async (data) => {
    const {
        firstName,
        lastName,
        dateOfBirth,
        email,
        password,
    } = data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        firstName,
        lastName,
        dateOfBirth,
        email,
        password: hashedPassword,
    });

    const token = generateToken(user._id);

    return {
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        token,
    };
};


export const loginUser = async (email, password) => {

    const user = await User
        .findOne({ email })
        .select("+password");


    if (!user) {
        throw new Error("Invalid credentials");
    }


    const isMatch = await bcrypt.compare(
        password,
        user.password
    );


    if (!isMatch) {
        throw new Error("Invalid credentials");
    }


    const token = generateToken(user._id);


    return {
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
        token,
    };
};