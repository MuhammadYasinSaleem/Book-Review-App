import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    description: { type: String },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }] // Array of reviews
}, { timestamps: true });

export const Book = mongoose.model("Book", BookSchema);
