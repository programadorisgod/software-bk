import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { CreditRepository } from "@Repository/credit/repository";
import { UserRepository } from "@Repository/user/repository";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";
import { isEmail, isPhoneNumber } from "@utils/validate/validateInputsForgotPassword";

export class UseCasePaymentQuota {
  private readonly repository: CreditRepository

  constructor(CreditRepository: CreditRepository) {
    this.repository = CreditRepository
  }
  async PaymentQuota(userId: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const userRepository = new UserRepository()

      let userFound = null

      if (isEmail(userId)) {
        userFound = await userRepository.findByMailUser(userId)
      }
        
      if (isPhoneNumber(userId)) {
        userFound = await userRepository.findByPhoneNumber(userId)
      }
        
      if (userFound instanceof Error) {
        return FailureProcess(userFound.message, 403)
      }
        
      if (!userFound) {
        return FailureProcess("user does not exist", 404)
      }

      let idCredit: string = ""

      userFound.credit.forEach(credit => {
        idCredit = credit.idCredit ;
      });

      const creditFound = await this.repository.findById(idCredit)

      if (creditFound instanceof Error) {
        return FailureProcess(creditFound.message, 403)
      }

      creditFound?.quotesPaid.forEach(quotes => {
        quotes.date = new Date().toLocaleDateString()
        quotes.totalValue = quotes.totalValue + quotes.capital
        quotes.interest = quotes.interest + quotes.capital
        quotes.capital = 0
        
        quotes.status = "Pagado"

      })

      
      
      return SuccessProcess("Payment quota succesfully", 200)
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}