import { router } from "@config/routerConfig";
import { BASE_URL } from "@constants/constants";
import { controllerTransfer } from "@controllers/transfer/transfer";
import { transferDto } from "@Dtos/transfer/transferDto";
import { validateDto } from "@middlewares/validator";
import { movementRepository } from "@Repository/movement/repository";
import { UserRepository } from "@Repository/user/repository";
import { caseUseFindTransfer } from "@useCases/transfer/find";
import { caseUseTransferMount } from "@useCases/transfer/transfer";
import { Router } from "express";

export const routeTransfer = ():Router=>{
    const repository = new movementRepository()
    
    const repositoryUser= new UserRepository()

    const caseUseTransfer = new caseUseTransferMount(repositoryUser,repository)
    const caseUseFind = new caseUseFindTransfer(repository)

    const transferController = new controllerTransfer(caseUseTransfer,caseUseFind)

    router.post(`${BASE_URL}/transfer`,validateDto(transferDto), transferController.transfer)
    router.get(`${BASE_URL}/getMovements/:id`,transferController.findMovements)

    return router
}