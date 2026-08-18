import { Router } from "express";
import { signup } from "../../controller/user.controller.js";

const useroute = Router()

useroute.post("/signup",signup )



export default useroute