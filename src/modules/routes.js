import { Router } from "express";
import loginRouter from "./auth/routes.js"

const routes = Router()

export default routes
.use(loginRouter)