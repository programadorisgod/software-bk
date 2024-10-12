import { CreditDto } from "@Dtos/credit/creditDto";
import { UseCaseCreditRegister} from "@useCases/credit/creditRegister"
import { NextFunction, Request, Response } from "express";

export class CreditController {
  private _useCaseCreditRegister!: UseCaseCreditRegister

  constructor(useCaseCreditRegister: UseCaseCreditRegister) {
    this._useCaseCreditRegister = useCaseCreditRegister

    this.register = this.register.bind(this)
  }

  async register(req: Request, res: Response, next: NextFunction) {

    const credit: CreditDto = req.body

    const creditRegistered = await this._useCaseCreditRegister.Register(credit)

    if (!creditRegistered.success) {
      const error = {
        status: creditRegistered.statusCode,
        message: creditRegistered.error,
      }
      return next(error)
    } 

    res.status(creditRegistered.statusCode).json({message: creditRegistered.value})
  }
}