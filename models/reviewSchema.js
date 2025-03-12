import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true }, // Reference to Book model
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    reviewText: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
}, { timestamps: true });

export const Review = mongoose.model("Review", ReviewSchema);
