import express from "express";

import { checkAuth } from "../middleware/auth.middleware.js";
import { addComment, deleteComment, updateComment } from "../../controller/comment.controller.js";

const router = express.Router();


router.post( "/new", checkAuth, addComment);
router.delete( "/:commentId", checkAuth,deleteComment);

router.put( "/:commentId", checkAuth, updateComment);



export default router;