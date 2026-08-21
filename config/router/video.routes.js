import { Router } from "express";
import { deleteVideo, getAllVideos, getMyVideos, getVideoById, update, upload } from "../../controller/video.controller.js";
import { checkAuth } from "../../middleware/auth.middleware.js";

const videoRoutes = Router()


videoRoutes.post("/upload", checkAuth, upload)

videoRoutes.put("/update/:id", checkAuth, update)

videoRoutes.delete("/delete/:id", checkAuth , deleteVideo)

videoRoutes.get("/all", getAllVideos)

videoRoutes.get("/my-videos", checkAuth, getMyVideos) 

videoRoutes.get("/:id", checkAuth, getVideoById)

export default videoRoutes