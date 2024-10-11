import express, { json, Request, Response } from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

import { errorHandlerMiddleware } from "@middlewares/handleError"
import { createRouterUser } from "@routes/users/createRouter"
import { DataBase } from "@frameworks/database/init"
import { createRouterAuth } from "@routes/Auth/auth"
import { createWriteStream } from "node:fs"
import path from "node:path"
import { logger } from "@utils/Log/logger"
import { routeTransfer } from "@routes/transfer/transfer"

const app = express()

const PORT = process.env.PORT || process.argv[3] || 3000

const pathFile = path.join(process.cwd(), "accessLog", "access.log")
const pathFileview = path.join(process.cwd(), "src", "public/forgotPassword")
const accessLogStream = createWriteStream(pathFile, {
  flags: "a",
  encoding: "utf-8",
})

async function startDB() {
  const BD = DataBase.Instance
  const dataSource = await BD.connectDB() // called the method for connecting the Database

  if (!dataSource) {
    console.log("Error connecting to the database")
    process.exit(1)
  }
}

startDB()
/** We disable the ‘X-Powered-By’ header in the HTTP response!.
 This header, by default, is added by Express and discloses Express server usage to clients. */
app.disable("x-powered-by")

app.use(helmet()) // We apply the middleware ‘helmet’ to set various security HTTP headers.

app.use(cors()) // Apply ‘cors’ middleware to allow requests from different domains.

app.use(json()) // We apply the middleware ‘json’ to parse the body of incoming requests in JSON format.

app.use(morgan("combined", { stream: accessLogStream }))
app.use(morgan("dev"))
//Routes
app.use(createRouterUser())
app.use("/api/v1/auth/view/reset-password", express.static(pathFileview))
app.get("/get-ip", async (_req: Request, res: Response) => {
  try {
    const response = await fetch("https://api.ipify.org?format=json")
    const data = await response.json()
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: "Error fetching IP" })
  }
})
//Middleware
app.use(errorHandlerMiddleware)
app.use(createRouterAuth())
app.use(routeTransfer())
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err)
  logger.error("Uncaught Exception: ", err)
})

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason)
  logger.error("Unhandled Rejection at:", promise, "reason:", reason)
})
