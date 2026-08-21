import { Router } from "express";
import { deleteVideo, getAllVideos, update, upload } from "../../controller/video.controller.js";
import { checkAuth } from "../../middleware/auth.middleware.js";

const videoRoutes = Router()


videoRoutes.post("/upload", checkAuth, upload)

videoRoutes.put("/update/:id", checkAuth, update)

videoRoutes.delete("/delete/:id", checkAuth , deleteVideo)

videoRoutes.get("/all", getAllVideos)

export default videoRoutes