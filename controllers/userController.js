import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";

export const UserRegister=async(req,res,next)=>{
    const {username,email,password}=req.body;
    if(!username|| !email|| !password)
    {
        return next(new ErrorHandler("Please fill full form",400))
    }
    let user=await User.findOne({email})
    if(user)
    {
        return next(new ErrorHandler("User Already Registered",400))
    }
    user=await User.create({
        username,email,password
    })
}