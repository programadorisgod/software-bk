import { router } from "@config/routerConfig";
import { BASE_URL } from "@constants/constants";
import { controllerTransfer } from "@controllers/transfer/transfer";
import { transferDto } from "@Dtos/transfer/transferDto";
import { validateDto } from "@middlewares/validator";
import { movementRepository } from "@Repository/movement/repository";
import { UserRepository } from "@Repository/user/repository";
import { caseUseTransferMount } from "@useCases/transfer/transfer";
import { Router } from "express";

export const routeTransfer = ():Router=>{
    const repository = new movementRepository()
    
    const repositoryUser= new UserRepository()

    const caseUseTransfer = new caseUseTransferMount(repositoryUser,repository)

    const transferController = new controllerTransfer(caseUseTransfer)

    router.post(`${BASE_URL}/transfer`,validateDto(transferDto), transferController.transfer)

    return router
}