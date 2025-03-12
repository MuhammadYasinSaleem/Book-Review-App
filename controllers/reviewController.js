import { Review } from "../models/reviewSchema.js";
import ErrorHandler from "../middleware/errorMiddleware.js";

// Add a new review (Only Logged-in Users)
export const addReview = async (req, res, next) => {
    try {
        const { bookId, reviewText, rating } = req.body;

        if (!bookId || !reviewText || !rating) {
            return next(new ErrorHandler("All fields are required", 400));
        }

        const review = await Review.create({
            bookId,
            userId: req.user._id, // Ensure only logged-in users can post reviews
            reviewText,
            rating
        });

        res.status(201).json({
            success: true,
            message: "Review added successfully!",
            review
        });

    } catch (error) {
        next(error);
    }
};
