import { Router } from "express";
import { deleteVideo, dislikeVideo, getAllVideos, getMyVideos, getVideoById,
 getVideosByCategory, getVideosByTag, likeVideo, update, upload } from "../../controller/video.controller.js";
import { checkAuth, checkOwnership } from "../../middleware/auth.middleware.js";

const videoRoutes = Router()


videoRoutes.post("/upload", checkAuth, upload)

videoRoutes.put("/update/:id", checkAuth, checkOwnership, update)

videoRoutes.delete("/delete/:id", checkAuth ,checkOwnership, deleteVideo)

videoRoutes.get("/all", getAllVideos)

videoRoutes.get("/my-videos", checkAuth, getMyVideos) 

videoRoutes.get("/:id", checkAuth, getVideoById)

videoRoutes.get("/category/:category", getVideosByCategory)

videoRoutes.get("/tag/:tag", getVideosByTag)

videoRoutes.post("/like", checkAuth, likeVideo)

videoRoutes.post("/dislike", checkAuth, dislikeVideo )

export default videoRoutes