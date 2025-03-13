import { Book } from "../models/bookSchema.js";
import { Review } from "../models/reviewSchema.js";
import ErrorHandler from "../middleware/errorMiddleware.js";


export const addBook = async (req, res, next) => {
    try {
        const { title, author, genre, description, publishedYear } = req.body;

   
        if (!title || !author || !genre || !publishedYear) {
            return next(new ErrorHandler("All fields are required except description", 400));
        }

       
        const existingBook = await Book.findOne({ title });
        if (existingBook) {
            return next(new ErrorHandler("Book with this title already exists", 400));
        }

      
        const book = await Book.create({ title, author, genre, description, publishedYear });

        res.status(201).json({
            success: true,
            message: "Book added successfully",
            book,
        });

    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req, res, next) => {
    try {
        const { id } = req.params; // Get book ID from request parameters

        const book = await Book.findById(id);
        if (!book) {
            return next(new ErrorHandler("Book not found!", 404));
        }

        
        await Review.deleteMany({ bookId: id });

        await book.deleteOne();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully!",
        });

    } catch (error) {
        next(error);
    }
};