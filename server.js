import express from "express"
import dotenv from "dotenv"

dotenv.config()


const app = express()









app.listen(process.env.PORT, ()=>{
    console.log(`youtube-backend sever is running at ${process.env.PORT}`);
    
})