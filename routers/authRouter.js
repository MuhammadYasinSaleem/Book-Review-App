import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { login, UserRegister } from "../controllers/usercontroller.js";

const router = express.Router();
router.post("/register", UserRegister);
router.post("/login",login)

export default router;
