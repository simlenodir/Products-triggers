import { Router } from "express";
import loginRouter from "./auth/routes.js"
import productRouter from "./products/routes.js"

const routes = Router()

export default routes
.use(loginRouter)
.use(productRouter)