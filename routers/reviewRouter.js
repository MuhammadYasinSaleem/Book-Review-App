import express from "express";
import { addReview } from "../controllers/reviewController.js";
import { verifyToken } from "../middleware/auth.js";

const reviewRouter = express.Router();

// POST request to add a review (Only logged-in users)
reviewRouter.post("/add", verifyToken, addReview);

export default reviewRouter;
