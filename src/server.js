import express from "express"
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorHandler.js"
import routes from "./modules/routes.js"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(errorHandler)
app.use(routes)
app.all('/*', (_, res) => res.sendStatus(404))

app.listen(PORT, () => {
    console.log(PORT);
})