import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const UserRegister = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return next(new ErrorHandler("Please fill the full form", 400));
        }

        let user = await User.findOne({ email });
        if (user) {
            return next(new ErrorHandler("User Already Registered", 400));
        }

        user = await User.create({
            username,
            email,
            password
        });

        // Generate JWT token
        const token = user.generateJsonWebToken();

        res.status(201).json({
            success: true,
            message: "User registered successfully!",
            user,
            token
        });

    } catch (error) {
        next(error);
    }
};
