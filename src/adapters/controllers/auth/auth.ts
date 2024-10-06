import { NextFunction, Request, Response } from "express"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { RegisterDto } from "@Dtos/Auth/registerDto"
import { UseCaseAuthRegister } from "@useCases/Auth/register"
import { ForgotPasswordDto } from "@Dtos/Auth/forgotPasswordDto"
import { UseCaseAuthForgotPassword } from "@useCases/Auth/forgotPassword"
import { resetPasswordDto } from "@Dtos/Auth/resetPassword"
import { UsecaseAuthResetPassword } from "@useCases/Auth/resetPassword"

export class AuthController {
  constructor(
    private useCaseLogin: UseCaseAuthLogin,
    private usecaseRegister: UseCaseAuthRegister,
    private useCaseForgotPassword: UseCaseAuthForgotPassword,
    private usecaseResetPassword: UsecaseAuthResetPassword,
  ) {
    //Enlazed the methods to the class
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const user: RegisterDto = req.body

    const userCreated = await this.usecaseRegister.create(user)

    if (!userCreated.success) {
      const error = {
        status: userCreated.statusCode,
        message: userCreated.error,
      }
      return next(error)
    }

    res.status(userCreated.statusCode).json({ message: userCreated.value })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const user = req.body

    const userLogged = await this.useCaseLogin.login(user)

    if (!userLogged.success) {
      const error = {
        status: userLogged.statusCode,
        message: userLogged.error,
      }
      return next(error)
    }

    res.status(userLogged.statusCode).json({ message: userLogged.value })
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const input: ForgotPasswordDto = req.body

    const forgotPasswordRequestStatus =
      await this.useCaseForgotPassword.forgotPassword(input)

    if (!forgotPasswordRequestStatus.success) {
      const error = {
        status: forgotPasswordRequestStatus.statusCode,
        message: forgotPasswordRequestStatus.error,
      }
      return next(error)
    }

    res
      .status(forgotPasswordRequestStatus.statusCode)
      .json({ message: forgotPasswordRequestStatus.value })
  }
  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const input: resetPasswordDto = req.body
    const resetPasswordStatus =
      await this.usecaseResetPassword.resetPassword(input)

    if (!resetPasswordStatus.success) {
      const error = {
        status: resetPasswordStatus.statusCode,
        message: resetPasswordStatus.error,
      }
      return next(error)
    }

    res
      .status(resetPasswordStatus.statusCode)
      .json({ message: resetPasswordStatus.value })
  }
}
