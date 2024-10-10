import { CreditDto } from "@Dtos/credit/creditDto"
import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI"
import { CreditRepository } from "@Repository/credit/repository"
import { SuccessProcess, FailureProcess } from "@utils/results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { Credit } from "@Entity/credit/credit"
import {
  isEmail,
  isPhoneNumber,
} from "@utils/validate/validateInputsForgotPassword"


export class UseCaseCreditRegister {
  private readonly repository: CreditRepository

  constructor(CreditRepository: CreditRepository) {
    this.repository = CreditRepository
  }

  async Register(userId:string,  credit: CreditDto): 
    Promise<ISuccessProcess<any> | IFailureProcess<any>> {
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

        if (userFound.credit.length > 0) {
          return FailureProcess("user already has a credit", 409)
        }

        const newCredit = new Credit()
        newCredit.idCredit = credit.idCredit
        newCredit.user = userFound
        newCredit.amountApproved = credit.amountApproved
        newCredit.interestType = credit.interestType
        newCredit.interestRate = credit.interestRate
        newCredit.totalInterest = 0
        newCredit.quotesPaid = []
        newCredit.quotesNumber = credit.quotesNumber
        newCredit.totalPaid = 0
        newCredit.paidInterest = 0
        newCredit.period = credit.period
        newCredit.startDate = new Date()
        newCredit.endDate = new Date()
        newCredit.creditStatus = "Active"

        const creditCreated = await this.repository.save(newCredit)

        if(creditCreated instanceof Error) {
          return FailureProcess(creditCreated.message, 403)
        }
        return SuccessProcess("Credit created succesfully", 200)
      } catch (error) {
        return FailureProcess("An unexpected error occurred", 500)
      }
      
  }
}
