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


export const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find(); // Fetch all books
        res.status(200).json({
            success: true,
            count: books.length,
            books
        });
    } catch (error) {
        next(new ErrorHandler("Failed to fetch books", 500));
    }
};

export const getBooksByAuthor = async (req, res, next) => {
    try {
        const { author } = req.params; // Extract author name from request params

        const books = await Book.find({ author }); // Find books with matching author name

        if (!books.length) {
            return next(new ErrorHandler("No books found for this author", 404));
        }

        res.status(200).json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        next(new ErrorHandler("Failed to fetch books by author", 500));
    }
};

export const getBooksByTitle = async (req, res, next) => {
    try {
        const { title } = req.params; // Extract title from request params

        const books = await Book.find({ title: { $regex: title, $options: "i" } }); // Case-insensitive search

        if (!books.length) {
            return next(new ErrorHandler("No books found with this title", 404));
        }

        res.status(200).json({
            success: true,
            count: books.length,
            books,
        });
    } catch (error) {
        next(new ErrorHandler("Failed to fetch books by title", 500));
    }
};