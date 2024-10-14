import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";
import { QuotesPaidRepository } from "@Repository/quotesPaid/repository";
import { UserRepository } from "@Repository/user/repository";
import { CreditRepository } from "@Repository/credit/repository";

export class UseCasePaymentQuota {
  private readonly repository: QuotesPaidRepository

  constructor(quotesPaidRepository: QuotesPaidRepository) {
    this.repository = quotesPaidRepository
  }
  async PaymentQuota(): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      
      const creditRepository = new CreditRepository()

      const credits = await creditRepository.findAll()
      if (credits instanceof Error) {
        return FailureProcess(credits.message, 403)
      }


      
      return SuccessProcess("Payment quota succesfully", 200)
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}