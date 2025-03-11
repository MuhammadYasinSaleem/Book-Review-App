import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import { generateToken } from "../utils/jwtToken.js";
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
      password,
    });

    // Generate JWT token
    generateToken(user, "User Registered Successfully!", 200, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please fill the full form", 400));
    }
    let user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorHandler("Invalid email or Password", 400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or Password", 400));
    }
  generateToken(user, "User logged in Successfully!", 200, res);
  } catch (error) {
    next(error);
  }
};
