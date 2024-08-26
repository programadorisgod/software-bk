import { errorHandlerMiddleware } from "adapters/middleware/handleError"
import express, { json } from "express"
import cors from "cors"
import { createRouterUser } from "@routes/users/createRouter"
import helmet from "helmet"
import { DataBase } from "@frameworks/database/init"

const app = express()

const PORT = process.env.PORT || process.argv[3] || 3000

const BD = DataBase.Instance

BD.connectDB() // called the method for connecting the Database

/** We disable the ‘X-Powered-By’ header in the HTTP response.
 This header, by default, is added by Express and discloses Express server usage to clients. */
app.disable("x-powered-by")

app.use(helmet()) // We apply the middleware ‘helmet’ to set various security HTTP headers.

app.use(cors()) // Apply ‘cors’ middleware to allow requests from different domains.

app.use(json()) // We apply the middleware ‘json’ to parse the body of incoming requests in JSON format.

//Routes
app.use(createRouterUser())

//Middleware
app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`)
})
