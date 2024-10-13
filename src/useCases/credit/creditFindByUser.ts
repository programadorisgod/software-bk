import { CreditRepository } from "@Repository/credit/repository"
import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

export class UseCaseCreditFindByUser {
  private readonly repository: CreditRepository

  constructor(creditRepository: CreditRepository) {
    this.repository = creditRepository
  }

  async FindByUser(userId: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const creditFound = await this.repository.findCreditByUser(userId)

      if (creditFound instanceof Error) {
        return FailureProcess(creditFound.message, 403)
      }
      return SuccessProcess(creditFound, 200)
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}