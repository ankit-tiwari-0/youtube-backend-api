import { Router } from "express";
import { login, signup } from "../../controller/user.controller.js";

const useroute = Router()

useroute.post("/signup",signup )
useroute.post("/login", login)



export default useroute