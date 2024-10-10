import { CreditController } from "@controllers/credit/credit"
import { UseCaseCreditRegister } from "@useCases/credit/creditRegister"
import { IFailure } from "@interfaces/Results/results"
import { Failure } from "@utils/results/results"

export class CreditControllerBuilder {
  private useCaseRegister!: UseCaseCreditRegister

  withRegister(useCase: UseCaseCreditRegister): CreditControllerBuilder {
    this.useCaseRegister = useCase
    return this
  }

  build(): CreditController | IFailure<string> {
    if (!this.useCaseRegister) return Failure("Use case Register is required")
    return new CreditController(this.useCaseRegister)
  }
}