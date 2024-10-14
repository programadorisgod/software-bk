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
import { QuotesPaid } from "@Entity/quotesPaid/quotesPaid"
import { QuotesPaidRepository} from "@Repository/quotesPaid/repository"

export class UseCaseCreditRegister {
  private readonly repository: CreditRepository

  constructor(CreditRepository: CreditRepository) {
    this.repository = CreditRepository
  }

  async Register(credit: CreditDto): 
    Promise<ISuccessProcess<any> | IFailureProcess<any>> {
      try {

        // Lista de periodos
        const values = [
          { key: 365, value: "Dia" },
          { key: 52, value: "Semana" },
          { key: 24, value: "Quincena" },
          { key: 12, value: "Mes" },
          { key: 6, value: "Bimestre" },
          { key: 4, value: "Trimestre" },
          { key: 2, value: "Semestre" },
          { key: 1, value: "Año" },
        ];
        const userRepository = new UserRepository()
        const MovementRepository = new movementRepository()
        const quotesPaidRepository = new QuotesPaidRepository()

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

        const totalC = parseFloat(credit.amountApproved) + parseFloat(Itotal.toString())

        const newCredit = new Credit()
        newCredit.idCredit = randomUUID()
        newCredit.user = userFound
        newCredit.amountApproved = parseFloat(credit.amountApproved)
        newCredit.interestType = credit.interestType
        newCredit.interestRate = intRate
        newCredit.totalInterest = Itotal
        newCredit.quotesPaid = []
        newCredit.quotesNumber = credit.quotesNumber
        newCredit.totalCredit = totalC
        newCredit.period = credit.period
        newCredit.startDate = getDateColombia().toLocaleDateString()
        newCredit.endDate = dateEnd
        newCredit.creditStatus = "Vigente"

        const creditCreated = await this.repository.save(newCredit)

        if(creditCreated instanceof Error) {
          return FailureProcess(creditCreated.message, 403)
        }

        const periodKey = values.find(v => v.value === credit.period)?.key || 12
        const startDate = getDateColombia()

        for (let i = 0; i < credit.quotesNumber; i++) {
          const quoteDate = new Date(startDate);
          
          switch(periodKey) {
            case 365: // Día
              quoteDate.setDate(quoteDate.getDate() + i + 1 ); 
              break;
            case 52: // Semana
              quoteDate.setDate(quoteDate.getDate() + i * 7 + 1); 
              break;
            case 24: // Quincena
              quoteDate.setDate(quoteDate.getDate() + i * 15 + 1); 
              break;
            case 12: // Mes
              quoteDate.setMonth(quoteDate.getMonth() + i + 1); 
              break;
            case 6: // Bimestre
              quoteDate.setMonth(quoteDate.getMonth() + i * 2 + 1); 
              break;
            case 4: // Trimestre
              quoteDate.setMonth(quoteDate.getMonth() + i * 3 + 1); 
              break;
            case 2: // Semestre
              quoteDate.setMonth(quoteDate.getMonth() + i * 6 + 1); 
              break;
            case 1: // Año
              quoteDate.setFullYear(quoteDate.getFullYear() + i + 1); 
              break;
            default:
              break;
          }

          const cInterest = parseFloat(newCredit.totalInterest.toString())/credit.quotesNumber
          const cCapital = parseFloat(credit.amountApproved)/credit.quotesNumber
          const total = cCapital + cInterest

          const quotesPaid = new QuotesPaid()
          quotesPaid.idQuotesPaid = i + 1
          quotesPaid.credit= newCredit
          quotesPaid.number = i + 1
          quotesPaid.date = quoteDate.toLocaleDateString()
          quotesPaid.capital = cCapital
          quotesPaid.interest = cInterest
          quotesPaid.totalValue = total
          quotesPaid.status = 'Pendiente'

          const quotesPaidCreated = await quotesPaidRepository.save(quotesPaid)

          if(quotesPaidCreated instanceof Error) 
            return FailureProcess(quotesPaidCreated.message, 403) 
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
