import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js"
dotenv.config()

const app = express()

app.use(express.json())
app.use(errorHandler)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(PORT);
})