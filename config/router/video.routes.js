import { Router } from "express";
import { upload } from "../../controller/video.controller.js";

const videoRoutes = Router()


videoRoutes.post("/upload", upload)


export default videoRoutes