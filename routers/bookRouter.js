import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addBook,deleteBook,getAllBooks,getBooksByAuthor,getBooksByTitle } from "../controllers/bookController.js";

const bookrouter = express.Router();

bookrouter.post("/add", verifyToken, addBook);
bookrouter.delete("/:id", verifyToken, deleteBook);
bookrouter.get("/all", getAllBooks);
bookrouter.get("/author/:author", getBooksByAuthor); // Route to get books by author
bookrouter.get("/title/:title", getBooksByTitle);
export default bookrouter;
