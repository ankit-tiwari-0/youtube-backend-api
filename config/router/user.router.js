import { Router } from "express";
import { signup } from "../../controller/signup.js";

const useroute = Router()

useroute.post("/signup",signup )



export default useroute