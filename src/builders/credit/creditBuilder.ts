import { CreditController } from "@controllers/credit/credit"
import { UseCaseCreditRegister } from "@useCases/credit/creditRegister"
import { UseCaseCreditFindAll } from "@useCases/credit/creditFindAll"
import { UseCaseCreditFindByUser } from "@useCases/credit/creditFindByUser"

import { IFailure } from "@interfaces/Results/results"
import { Failure } from "@utils/results/results"

export class CreditControllerBuilder {
  private useCaseRegister!: UseCaseCreditRegister
  private useCaseFindAll!: UseCaseCreditFindAll
  private useCaseFindByUser!: UseCaseCreditFindByUser

  withRegister(useCase: UseCaseCreditRegister): CreditControllerBuilder {
    this.useCaseRegister = useCase
    return this
  }

  withFindAll(useCase: UseCaseCreditFindAll): CreditControllerBuilder {
    this.useCaseFindAll = useCase
    return this
  }

  withFindByUser(useCase: UseCaseCreditFindByUser): CreditControllerBuilder {
    this.useCaseFindByUser = useCase
    return this
  }

  build(): CreditController | IFailure<string> {
    if (!this.useCaseRegister) return Failure("Use case Register is required")
    if (!this.useCaseFindAll) return Failure("Use case FindAll is required")
    if (!this.useCaseFindByUser) return Failure("Use case FindByUser is required")
    return new CreditController(this.useCaseRegister, this.useCaseFindAll, this.useCaseFindByUser)
  }
}