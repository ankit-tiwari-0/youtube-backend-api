import express from "express";

import { checkAuth } from "../middleware/auth.middleware.js";
import { addComment, deleteComment } from "../../controller/comment.controller.js";

const router = express.Router();


router.post( "/new", checkAuth, addComment);
router.delete( "/:commentId", checkAuth,deleteComment);





export default router;