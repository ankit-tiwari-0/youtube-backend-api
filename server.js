import express, { json } from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"


import { connectDB } from "./config/db.js"
import useroute from "./config/router/user.router.js"

dotenv.config()


const app = express()
connectDB()


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

app.use(json())


app.use("/api/user", useroute)









app.listen(process.env.PORT, ()=>{
    console.log(`youtube-backend sever is running at ${process.env.PORT}`);
    
})