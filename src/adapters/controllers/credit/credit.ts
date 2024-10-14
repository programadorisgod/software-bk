import { CreditDto } from "@Dtos/credit/creditDto";
import { UseCaseCreditRegister} from "@useCases/credit/creditRegister"
import { UseCaseCreditFindAll } from "@useCases/credit/creditFindAll"
import { UseCaseCreditFindByUser } from "@useCases/credit/creditFindByUser"
import { UseCasePaymentQuota } from "@useCases/credit/paymentQuota"
import { NextFunction, Request, Response } from "express";

export class CreditController {
  private _useCaseCreditRegister!: UseCaseCreditRegister
  private _useCaseCreditFindAll!: UseCaseCreditFindAll
  private _useCaseCreditFindByUser!: UseCaseCreditFindByUser
  private _useCasePaymentQuota!: UseCasePaymentQuota

  constructor(
    useCaseCreditRegister: UseCaseCreditRegister, 
    useCaseCreditFindAll: UseCaseCreditFindAll, 
    useCaseCreditFindByUser: UseCaseCreditFindByUser,
    useCasePaymentQuota: UseCasePaymentQuota,
  ) {
    this._useCaseCreditRegister = useCaseCreditRegister
    this._useCaseCreditFindAll = useCaseCreditFindAll
    this._useCaseCreditFindByUser = useCaseCreditFindByUser
    this._useCasePaymentQuota = useCasePaymentQuota

    this.register = this.register.bind(this)
    this.findAll = this.findAll.bind(this)
    this.findCreditByUser = this.findCreditByUser.bind(this)
    this.paymentQuota = this.paymentQuota.bind(this)
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

  async findAll(req: Request, res: Response, next: NextFunction) {
    const credits = await this._useCaseCreditFindAll.FindAll()
    if (!credits.success) {
      const error = {
        status: credits.statusCode,
        message: credits.error,
      }
      return next(error)
    } 
    res.status(credits.statusCode).json({message: credits.value})
  }

  async findCreditByUser(req: Request, res: Response, next: NextFunction) {
    const credit = await this._useCaseCreditFindByUser.FindByUser(req.params.id)
    if (!credit.success) {
      const error = {
        status: credit.statusCode,
        message: credit.error,
      }
      return next(error)
    } 
    res.status(credit.statusCode).json({message: credit.value})
  }

  async paymentQuota(req: Request, res: Response, next: NextFunction) {
    const credit = await this._useCasePaymentQuota.PaymentQuota()
    
    if(!credit)
      return next(credit)

    if (!credit.success) {
      const error = {
        status: credit.statusCode,
        message: credit.error,
      }
      return next(error)
    } 
    res.status(credit.statusCode)
  }
}