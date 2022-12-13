import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const sign = payload => jwt.sign( payload, process.env.SECRET_KEY )