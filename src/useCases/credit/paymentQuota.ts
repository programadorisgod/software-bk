import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";
import { QuotesPaidRepository } from "@Repository/quotesPaid/repository";
import { UserRepository } from "@Repository/user/repository";
import { CreditRepository } from "@Repository/credit/repository";
import { Movement } from "@Entity/movement/movement";
import { movementRepository } from "@Repository/movement/repository";
import { randomUUID } from "crypto";
import { getDateColombia } from "@utils/Date/date";



export class UseCasePaymentQuota {
  private readonly repository: QuotesPaidRepository


  constructor(quotesPaidRepository: QuotesPaidRepository) {
    this.repository = quotesPaidRepository

  }
  async PaymentQuota() {
    try {
      const creditRepository = new CreditRepository()
      const userRepository = new UserRepository()
      const MovementRepository = new movementRepository()

      // Obtener todos los usuarios
      const users = await userRepository.findAll()

      if(users instanceof Error) 
        return FailureProcess("Error getting users", 500)
      
      // Recorrer los usuarios
      for (const user of users) {
        console.log("this user is ", user.name)
        if(user.credit.length === 0) {
          continue
        }

        const credit = await creditRepository.findCreditByUser(user.phoneNumber)

        if(credit instanceof Error) 
          return FailureProcess("Error getting credits", 500)
        
        if (!credit) 
          return FailureProcess("Credit ID not found", 500)
        
        const quotesPaid = await this.repository.findByCredit(credit.idCredit)

        if(quotesPaid instanceof Error ) 
          return FailureProcess("Error getting quotes", 500)

        if (!quotesPaid) 
          return FailureProcess("Quotes not found", 500)

        const quoteSort = quotesPaid.sort((a, b) => a.number - b.number)

        const quotePending = quoteSort.find(quote => quote.status === "Pendiente")

        if(quotePending instanceof Error) 
          return FailureProcess("Error getting quote", 500)

        if (!quotePending) 
          continue

        // if(quotePending.date !== getDateColombia().toLocaleDateString()) {
        //   continue
        // }

        if(parseFloat(user.balance.toString()) < parseFloat(quotePending.totalValue.toString())) {
          console.log("this user has no balance") //Envia un email a la persona
          continue
        }

        const newBalance = parseFloat(user.balance.toString()) - parseFloat(quotePending.totalValue.toString())
        
        const updateBalance = await userRepository.updateBalance(user.phoneNumber, newBalance)
        
        if(updateBalance instanceof Error) 
          return FailureProcess(updateBalance.message, 403)

        quotePending.status = "Pagado"
        
        const updateQuote = await this.repository.update(quotePending.idQuotesPaid, quotePending)
        
        if(updateQuote instanceof Error) 
          return FailureProcess(updateQuote.message, 403)

        const movementCredit = new Movement()
        movementCredit.idMovement = randomUUID()
        movementCredit.description = `Pago de Cuota # ${quotePending.number} por valor de ${quotePending.totalValue}`
        movementCredit.dateMovement = getDateColombia()
        movementCredit.omuntMovement = quotePending.totalValue
        movementCredit.origin = user.name
        movementCredit.destination = "Nekli"
        movementCredit.user = user
        movementCredit.typeTransfer = 'Credito'

        const movementCreated = await MovementRepository.save(movementCredit)

        if(movementCreated instanceof Error) 
          return FailureProcess(movementCreated.message, 403)

        //enviar correo de que se pago el credito
      }    
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}