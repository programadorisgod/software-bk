import { createTransport } from "nodemailer"
import hbs from "nodemailer-express-handlebars"
import path from "path"

const transporter = createTransport({
  service: process.env.HOST_EMAIL,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS,
  },
})

transporter.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      layoutsDir: "views/",
      defaultLayout: "",
    },
    viewPath: path.join(process.cwd(), "src", "views"),
  }),
)

export { transporter }
