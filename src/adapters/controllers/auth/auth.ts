import { NextFunction, Request, Response } from "express"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { RegisterDto } from "@Dtos/Auth/registerDto"
import { UseCaseAuthRegister } from "@useCases/Auth/register"

export class AuthController {
  private readonly useCaseAuthLogin: UseCaseAuthLogin
  private readonly useCaseRegister: UseCaseAuthRegister

  constructor(
    useCaseLogin: UseCaseAuthLogin,
    usecaseRegister: UseCaseAuthRegister,
  ) {
    this.useCaseAuthLogin = useCaseLogin
    this.useCaseRegister = usecaseRegister
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const user: RegisterDto = req.body

    const userCreated = await this.useCaseRegister.create(user)

    if (!userCreated.success) {
      const error = {
        status: 403,
        message: userCreated.error,
      }
      return next(error)
    }

    res.status(200).json({ message: userCreated.value })
  }

  async login(req: Request, res: Response, next: NextFunction) {
    const user = req.body

    const userLogged = await this.useCaseAuthLogin.login(user)

    if (!userLogged.success) {
      const error = {
        status: 403,
        message: userLogged.error,
      }
      return next(error)
    }

    res.status(200).json({ message: userLogged.value })
  }
}
