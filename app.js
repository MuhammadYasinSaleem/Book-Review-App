import express from "express"
import cors from "cors"
import {config} from 'dotenv'
import { dbConnection } from "./database/dbConnection.js"

const app=express()
config({path:"./config/config.env"})
app.use(cors({
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))
dbConnection()
export default app