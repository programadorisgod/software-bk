import { NextFunction, Request, Response } from "express"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { RegisterDto } from "@Dtos/Auth/registerDto"
import { UseCaseAuthRegister } from "@useCases/Auth/register"

export class AuthController {
  private readonly useCaseAuthLogin: UseCaseAuthLogin
  private readonly usecaseAuthRegister: UseCaseAuthRegister

  constructor(
    useCaseLogin: UseCaseAuthLogin,
    usecaseRegister: UseCaseAuthRegister,
  ) {
    this.useCaseAuthLogin = useCaseLogin
    this.usecaseAuthRegister = usecaseRegister

    //Enlazed the methods to the class
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
  }

  async register(req: Request, res: Response, next: NextFunction) {
    const user: RegisterDto = req.body

    const userCreated = await this.usecaseAuthRegister.create(user)

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

    const userLogged = await this.useCaseAuthLogin.login(user)

    if (!userLogged.success) {
      const error = {
        status: userLogged.statusCode,
        message: userLogged.error,
      }
      return next(error)
    }

    res.status(userLogged.statusCode).json({ message: userLogged.value })
  }
}
