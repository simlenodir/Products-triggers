import { Router } from "express";
import auth from "./auth.js";

const loginRouter = Router()

export default loginRouter
.post('/login', auth.POST_Login)