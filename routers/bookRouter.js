import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addBook,deleteBook,getAllBooks } from "../controllers/bookController.js";

const bookrouter = express.Router();

bookrouter.post("/add", verifyToken, addBook);
bookrouter.delete("/:id", verifyToken, deleteBook);
bookrouter.get("/all", getAllBooks);
export default bookrouter;
