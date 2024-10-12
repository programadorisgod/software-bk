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

  async Register(credit: CreditDto): 
    Promise<ISuccessProcess<any> | IFailureProcess<any>> {
        console.log("entro al caso de uso1")
      try {
        const userRepository = new UserRepository()

        console.log("entro al caso de uso2")

        let userFound = null

        if (isEmail(credit.userId)) {
          userFound = await userRepository.findByMailUser(credit.userId)
        }
        
        if (isPhoneNumber(credit.userId)) {
          userFound = await userRepository.findByPhoneNumber(credit.userId)
        }
        
        if (userFound instanceof Error) {
          return FailureProcess(userFound.message, 403)
        }
        
        if (!userFound) {
          return FailureProcess("user does not exist", 404)
        }
        
        if (userFound?.credit?.length > 0) {
          return FailureProcess("user already has a credit", 409)
        }
        
        const intRate = parseFloat(credit.interestRate)/100
        
        const newCredit = new Credit()
        newCredit.idCredit = crypto.randomUUID()
        newCredit.user = userFound
        newCredit.amountApproved = parseFloat(credit.amountApproved)
        newCredit.interestType = credit.interestType
        newCredit.interestRate = intRate
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
        console.log(error)
        return FailureProcess("An unexpected error occurred", 500)
      }
      
  }
}
