import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js"; // Ensure User model is imported
import ErrorHandler from "../middleware/errorMiddleware.js"; // Ensure error handling is available

export const verifyToken = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const formattedToken = token.replace("Bearer ", "").trim();  

        const decoded = jwt.verify(formattedToken, process.env.JWT_SECRET_KEY);

        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found in the database!", 404));
        }

        next();
    } catch (error) {
        console.error("JWT Verification Error:", error); 
        return res.status(403).json({ message: "Invalid Token" });
    }
};
