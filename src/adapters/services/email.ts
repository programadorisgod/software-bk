import { transporter } from "@config/email"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { getCurrentDate } from "@utils/Date/date"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"
import path from "path"

interface sendEmailUpdatedPasswordProps {
  email: string
  name: string
  ip: string
  userAgent: string
}

export class EmailService {
  static async sendEmail(
    email: string,
    name: string,
    resetLink: string,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Restablecer contraseña. Por favor no responder a este correo`,
        template: "emailTemplate",
        context: {
          name,
          resetLink,
        },
        attachments: [
          {
            filiname: "logo.png",
            path: path.join(process.cwd(), "src", "public", "images/logo.png"),
            cid: "logo@correo.com",
          },
        ],
      }

      await transporter.sendMail(emailOptions)

      return SuccessProcess("Email Send", 200)
    } catch (error) {
      return FailureProcess("Error when sending mail", 500)
    }
  }
  static async sendEmailUpdatedPassword({
    email,
    name,
    ip,
    userAgent,
  }: sendEmailUpdatedPasswordProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Contraseña restablecida. Por favor no responder a este correo`,
        template: "emailUpdatedPassword",
        context: {
          name,
          ip,
          userAgent,
          date: getCurrentDate(),
        },
        attachments: [
          {
            filiname: "logo.png",
            path: path.join(process.cwd(), "src", "public", "images/logo.png"),
            cid: "logo@correo.com",
          },
        ],
      }
      await transporter.sendMail(emailOptions)
      return SuccessProcess("Email Send", 200)
    } catch (error) {
      return FailureProcess("Error when sending mail", 500)
    }
  }
}
