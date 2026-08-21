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
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>YouTube Backend API</title>

            <style>
                * {
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }

                body {
                    min-height: 100vh;
                    font-family: Arial, sans-serif;
                    color: white;
                    background:
                        radial-gradient(circle at top left, #3b0764, transparent 35%),
                        radial-gradient(circle at bottom right, #064e3b, transparent 35%),
                        #09090b;

                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 30px;
                }

                .container {
                    width: 100%;
                    max-width: 900px;
                    text-align: center;
                }

                .badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;

                    padding: 8px 16px;
                    border: 1px solid #27272a;
                    border-radius: 50px;

                    background: rgba(24, 24, 27, 0.8);
                    color: #22c55e;

                    font-size: 14px;
                    margin-bottom: 25px;
                }

                .dot {
                    width: 9px;
                    height: 9px;
                    background: #22c55e;
                    border-radius: 50%;

                    box-shadow: 0 0 12px #22c55e;
                    animation: pulse 1.5s infinite;
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 0.4;
                    }
                }

                h1 {
                    font-size: clamp(42px, 7vw, 75px);
                    margin-bottom: 15px;

                    background: linear-gradient(
                        90deg,
                        #ffffff,
                        #a78bfa,
                        #22c55e
                    );

                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .subtitle {
                    font-size: 20px;
                    color: #a1a1aa;
                    margin-bottom: 40px;
                }

                .cards {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 15px;
                    margin-bottom: 25px;
                }

                .card {
                    padding: 22px;
                    background: rgba(24, 24, 27, 0.75);

                    border: 1px solid #27272a;
                    border-radius: 16px;

                    backdrop-filter: blur(10px);

                    transition: transform 0.2s ease,
                                border-color 0.2s ease;
                }

                .card:hover {
                    transform: translateY(-5px);
                    border-color: #52525b;
                }

                .icon {
                    font-size: 28px;
                    margin-bottom: 10px;
                }

                .card h3 {
                    font-size: 16px;
                    margin-bottom: 6px;
                }

                .card p {
                    color: #a1a1aa;
                    font-size: 14px;
                }

                .endpoints {
                    text-align: left;

                    padding: 25px;

                    background: rgba(24, 24, 27, 0.8);

                    border: 1px solid #27272a;
                    border-radius: 16px;

                    margin-bottom: 25px;
                }

                .endpoints h2 {
                    margin-bottom: 18px;
                    font-size: 20px;
                }

                .endpoint {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    padding: 13px 15px;
                    margin-bottom: 10px;

                    background: #18181b;
                    border-radius: 10px;

                    font-family: monospace;
                }

                .method {
                    color: #22c55e;
                    font-weight: bold;
                    margin-right: 15px;
                }

                .path {
                    color: #d4d4d8;
                }

                footer {
                    color: #71717a;
                    font-size: 14px;
                }

                .tech {
                    color: #a78bfa;
                }

                @media (max-width: 700px) {
                    .cards {
                        grid-template-columns: 1fr;
                    }

                    .endpoint {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 5px;
                    }

                    .subtitle {
                        font-size: 16px;
                    }
                }
            </style>
        </head>

        <body>

            <div class="container">

                <div class="badge">
                    <span class="dot"></span>
                    API ONLINE
                </div>

                <h1>🎬 YouTube Backend API</h1>

                <p class="subtitle">
                    A scalable REST API built for a YouTube-like platform.
                </p>


                <div class="cards">

                    <div class="card">
                        <div class="icon">🟢</div>
                        <h3>Server Status</h3>
                        <p>Running successfully</p>
                    </div>

                    <div class="card">
                        <div class="icon">🗄️</div>
                        <h3>Database</h3>
                        <p>MongoDB Connected</p>
                    </div>

                    <div class="card">
                        <div class="icon">🐳</div>
                        <h3>Deployment</h3>
                        <p>Docker + Render</p>
                    </div>

                </div>


                <div class="endpoints">

                    <h2>📡 API Routes</h2>

                    <div class="endpoint">
                        <div>
                            <span class="method">USER</span>
                            <span class="path">/api/user</span>
                        </div>
                    </div>

                    <div class="endpoint">
                        <div>
                            <span class="method">VIDEO</span>
                            <span class="path">/api/video</span>
                        </div>
                    </div>

                    <div class="endpoint">
                        <div>
                            <span class="method">COMMENT</span>
                            <span class="path">/api/comment</span>
                        </div>
                    </div>

                </div>


                <footer>
                    Built with
                    <span class="tech">Node.js</span> ·
                    <span class="tech">Express.js</span> ·
                    <span class="tech">MongoDB</span> ·
                    <span class="tech">Docker</span>
                </footer>

            </div>

        </body>
        </html>
    `);
});
app.use("/api/user", useroute)
app.use("/api/video", videoRoutes)
app.use("/api/comment", router)









app.listen(process.env.PORT, ()=>{
    console.log(`youtube-backend sever is running at ${process.env.PORT}`);
    
})