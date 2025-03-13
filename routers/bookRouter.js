import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { addBook,deleteBook } from "../controllers/bookController.js";

const bookrouter = express.Router();

bookrouter.post("/add", verifyToken, addBook);
bookrouter.delete("/:id", verifyToken, deleteBook);
export default bookrouter;
