import { Router } from "express";
import { upload } from "../../controller/video.controller.js";
import { checkAuth } from "../../middleware/auth.middleware.js";

const videoRoutes = Router()


videoRoutes.post("/upload", checkAuth, upload)


export default videoRoutes