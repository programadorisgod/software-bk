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
import { calculateDateEnd } from "@utils/Date/calculateDateEnd"
import { randomUUID } from "node:crypto"
import { getDateColombia } from "@adapters/utils/Date/date";
import { Movement } from "@Entity/movement/movement";
import { movementRepository } from "@Repository/movement/repository"

export class UseCaseCreditRegister {
  private readonly repository: CreditRepository

  constructor(CreditRepository: CreditRepository) {
    this.repository = CreditRepository
  }

  async Register(credit: CreditDto): 
    Promise<ISuccessProcess<any> | IFailureProcess<any>> {
      try {
        const userRepository = new UserRepository()
        const MovementRepository = new movementRepository()

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

        const dateEnd = calculateDateEnd(new Date(), credit.period, credit.quotesNumber)
        
        let Itotal = 0
        
        if(credit.interestType === "Simple"){
          Itotal = parseFloat(credit.amountApproved) * intRate * credit.quotesNumber 
        }

        if (credit.interestType === "Compuesto"){ 
          Itotal = parseFloat(credit.amountApproved) * Math.pow( ( 1 + intRate ), credit.quotesNumber )
        }

        const newCredit = new Credit()
        newCredit.idCredit = randomUUID()
        newCredit.user = userFound
        newCredit.amountApproved = parseFloat(credit.amountApproved)
        newCredit.interestType = credit.interestType
        newCredit.interestRate = intRate
        newCredit.totalInterest = Itotal
        newCredit.quotesPaid = []
        newCredit.quotesNumber = credit.quotesNumber
        newCredit.totalPaid = 0
        newCredit.paidInterest = 0
        newCredit.period = credit.period
        newCredit.startDate = getDateColombia().toLocaleDateString()
        newCredit.endDate = dateEnd
        newCredit.creditStatus = "Vigente"

        const creditCreated = await this.repository.save(newCredit)

        if(creditCreated instanceof Error) {
          return FailureProcess(creditCreated.message, 403)
        }

        const newAmount = parseFloat(newCredit.amountApproved.toString()) + parseFloat(userFound.balance.toString())

        const updateBalance = userRepository.updateBalance(credit.userId,newAmount)
        if(updateBalance instanceof Error) 
          return FailureProcess(updateBalance.message, 403)

        const movementCredit = new Movement()
        movementCredit.idMovement = randomUUID()
        movementCredit.description = "Credit Approved"
        movementCredit.dateMovement = getDateColombia()
        movementCredit.omuntMovement = newCredit.amountApproved
        movementCredit.origin = "Nekli"
        movementCredit.user = userFound
        movementCredit.typeTransfer = 'Debito'

        const movementCreated = await MovementRepository.save(movementCredit)

        if(movementCreated instanceof Error) 
          return FailureProcess(movementCreated.message, 403)
        
        return SuccessProcess("Credit created succesfully", 200)
      } catch (error) {
        console.log(error)
        return FailureProcess("An unexpected error occurred", 500)
      }
      
  }
}
