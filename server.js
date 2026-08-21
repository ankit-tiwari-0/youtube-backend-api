import express, { json } from "express"
import dotenv from "dotenv"
import fileUpload from "express-fileupload"


import { connectDB } from "./config/db.js"
import useroute from "./config/router/user.router.js"
import videoRoutes from "./config/router/video.routes.js"
import router from "./config/router/comment.js"

dotenv.config()


const app = express()
connectDB()


app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

app.use(express.urlencoded({ extended: true }));

app.use(json())

app.get("/", (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>YouTube Backend API</title>
            <style>
                body {
                    margin: 0;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #111;
                    color: white;
                    font-family: Arial, sans-serif;
                    text-align: center;
                }

                h1 {
                    font-size: 60px;
                    margin-bottom: 20px;
                }

                p {
                    font-size: 24px;
                    color: #aaa;
                }

                .status {
                    color: #00ff88;
                    font-weight: bold;
                }
            </style>
        </head>

        <body>
            <div>
                <h1>🎬 YouTube Backend API</h1>
                <p class="status">● Server is Running</p>
                <p>🚀 API successfully deployed on Render</p>
            </div>
        </body>
        </html>
    `);
});

app.use("/api/user", useroute)
app.use("/api/video", videoRoutes)
app.use("app/comment", router)









app.listen(process.env.PORT, ()=>{
    console.log(`youtube-backend sever is running at ${process.env.PORT}`);
    
})