import jwt from "jsonwebtoken";

export const verifyToken = async(req, res, next) => {
    const token = req.header("Authorization"); // Get token from request headers

    if (!token) {
        return res.status(401).json({ message: "Access Denied! No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET_KEY);
        req.user = await User.findById(decoded.id);
        if (!req.user) {
            return next(new ErrorHandler("User not found in the database!", 404));
        }
        next(); // Move to next middleware
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
};
