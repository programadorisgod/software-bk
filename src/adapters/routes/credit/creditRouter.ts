import { CreditControllerBuilder } from "@builders/credit/creditBuilder"
import { CreditController } from "@controllers/credit/credit"
import { CreditRepository } from "@Repository/credit/repository"
import { UseCaseCreditRegister } from "@useCases/credit/creditRegister"
import { BASE_URL } from "@constants/constants"
import { Router } from "express"
import { router } from "@config/routerConfig"
import { CreditDto } from "@Dtos/credit/creditDto"
import { validateDto } from "@middlewares/validator"

export const CreateRouterCredit = (): Router => {
  const repository = new CreditRepository()

  const useCaseRegister = new UseCaseCreditRegister(repository)

  const creditController = new CreditControllerBuilder()
    .withRegister(useCaseRegister)
    .build()

  if(creditController instanceof CreditController) {
    router.post(`${BASE_URL}/credit`, validateDto(CreditDto) , creditController.register)
  } else {
    console.log(`[Error] when building UserController: ${creditController.error} `)
  }
  
  return router
}