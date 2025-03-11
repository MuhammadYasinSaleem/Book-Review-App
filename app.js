import express from "express"
import cors from "cors"
import {config} from 'dotenv'
import { dbConnection } from "./database/dbConnection.js"
import router from "./routers/authRouter.js"
import { errorMiddleware } from "./middleware/errorMiddleware.js"

const app=express()
config({path:"./config/config.env"})
app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/user",router)
dbConnection()
app.use(errorMiddleware)
export default app