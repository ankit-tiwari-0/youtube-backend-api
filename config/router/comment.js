import express from "express";

import { checkAuth } from "../middleware/auth.middleware.js";
import { addComment } from "../../controller/comment.controller.js";

const router = express.Router();


router.post( "/new", checkAuth, addComment);





export default router;