import { CreditControllerBuilder } from "@builders/credit/creditBuilder"
import { CreditController } from "@controllers/credit/credit"
import { CreditRepository } from "@Repository/credit/repository"
import { UseCaseCreditRegister } from "@useCases/credit/creditRegister"
import { BASE_URL } from "@constants/constants"
import { Router } from "express"
import { CreditDto } from "@Dtos/credit/creditDto"
import { validateDto } from "@middlewares/validator"

export const CreateRouterCredit = (): Router => {
  console.log("entro a la ruta")
  const repository = new CreditRepository()

  const router = Router()

  const useCaseRegister = new UseCaseCreditRegister(repository)

  const creditController = new CreditControllerBuilder()
    .withRegister(useCaseRegister)
    .build()

  if(creditController instanceof CreditController) {
    console.log("entro al if")
    router.post(`${BASE_URL}/credit`, validateDto(CreditDto) , creditController.register)
  } else {
    console.log(`[Error] when building UserController: ${creditController.error} `)
  }
  
  return router
}