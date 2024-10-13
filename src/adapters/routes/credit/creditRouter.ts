import { CreditControllerBuilder } from "@builders/credit/creditBuilder"
import { CreditController } from "@controllers/credit/credit"
import { CreditRepository } from "@Repository/credit/repository"
import { UseCaseCreditRegister } from "@useCases/credit/creditRegister"
import { BASE_URL } from "@constants/constants"
import { Router } from "express"
import { CreditDto } from "@Dtos/credit/creditDto"
import { validateDto } from "@middlewares/validator"
import { UseCaseCreditFindAll } from "@useCases/credit/creditFindAll"
import { UseCaseCreditFindByUser } from "@useCases/credit/creditFindByUser"

export const CreateRouterCredit = (): Router => {
  const repository = new CreditRepository()

  const router = Router()

  const useCaseRegister = new UseCaseCreditRegister(repository)
  const useCaseFindAll = new UseCaseCreditFindAll(repository)
  const useCaseFindByUser = new UseCaseCreditFindByUser(repository)

  const creditController = new CreditControllerBuilder()
    .withRegister(useCaseRegister)
    .withFindAll(useCaseFindAll)
    .withFindByUser(useCaseFindByUser)
    .build()

  if(creditController instanceof CreditController) {
    router.get(`${BASE_URL}/credits`, creditController.findAll)
    router.get(`${BASE_URL}/credit/:id`, creditController.findCreditByUser)
    router.post(`${BASE_URL}/credit`, validateDto(CreditDto) , creditController.register)
  } else {
    console.log(`[Error] when building UserController: ${creditController.error} `)
  }
  
  return router
}