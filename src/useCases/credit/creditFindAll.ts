import { CreditRepository } from "@Repository/credit/repository";
import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";

export class UseCaseCreditFindAll {
  private readonly repository: CreditRepository

  constructor(CreditRepository: CreditRepository) {
    this.repository = CreditRepository
  }

  async FindAll(): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const credits = await this.repository.findAll()
      if (credits instanceof Error) {
        return FailureProcess(credits.message, 403)
      }
      return SuccessProcess(credits, 200)
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}