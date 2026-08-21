import { Router } from "express";
import { login, signup, subscribe, updateProfile } from "../../controller/user.controller.js";
import { checkAuth } from "../../middleware/auth.middleware.js";

const useroute = Router()

useroute.post("/signup",signup )
useroute.post("/login", login)
useroute.put("/update-profile", checkAuth, updateProfile)
useroute.post("/subscribe",checkAuth , subscribe)


export default useroute