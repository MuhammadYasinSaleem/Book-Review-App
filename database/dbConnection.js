import mongoose from "mongoose";

export const dbConnection=()=>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName:"Book-Review-App",
    }).then(()=>{
        console.log("Database connected successfully")
    }).catch((err)=>{
        console.log(`error while connecting to database ${err}`)
    })
}