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

interface sendEmailCreditProps {
  email: string
  name: string
  credit: string
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

  static async sendEmailCreditApproved({
    email,
    name,
    credit,
    userAgent,
  }: sendEmailCreditProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Nuevo crédito aprobado. Por favor no responder a este correo`,
        template: "emailCreditApproved",
        context: {
          name,
          credit,
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

  static async sendEmailCreditRejected({
    email,
    name,
    credit,
    userAgent,
  }: sendEmailCreditProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Nuevo crédito rechazado. Por favor no responder a este correo`,
        template: "emailCreditRejected",
        context: {
          name,
          credit,
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

  static async sendEmailCreditPaid({
    email,
    name,
    credit,
    userAgent,
  }: sendEmailCreditProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Nuevo crédito pagado. Por favor no responder a este correo`,
        template: "emailCreditPaid",
        context: {
          name,
          credit,
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

  static async sendEmailQuotaApproved({
    email,
    name,
    credit,
    userAgent,
  }: sendEmailCreditProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `Cuota de crédito pagada. Por favor no responder a este correo`,
        template: "emailQuotaPaid",
        context: {
          name,
          credit,
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

  static async sendEmailQuotaRejected({
    email,
    name,
    credit,
    userAgent,
  }: sendEmailCreditProps): Promise<
    ISuccessProcess<any> | IFailureProcess<any>
  > {
    try {
      const emailOptions = {
        from: process.env.USER,
        to: email,
        subject: `El paso de la cuota de crédito ha sido rechazado. Por favor no responder a este correo`,
        template: "emailCreditRejected",
        context: {
          name,
          credit,
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
