import { UseCaseCreditRegister } from "@useCases/credit/creditRegister";

export class CreditController {
  private _useCaseRegister!: UseCaseCreditRegister

  constructor(useCaseRegister: UseCaseCreditRegister) {
    this._useCaseRegister = useCaseRegister

    this.register = this.register.bind(this)
  }

  async register(userId: string, credit: any) {
    return await this._useCaseRegister.Register(userId, credit)
  }
}