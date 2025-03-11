import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { UserRegister } from "../controllers/usercontroller.js";

const router = express.Router();
router.post("/register", UserRegister);

export default router;
