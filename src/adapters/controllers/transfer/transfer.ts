import { transferDto } from "@Dtos/transfer/transferDto";
import { caseUseFindTransfer } from "@useCases/transfer/find";
import { caseUseTransferMount } from "@useCases/transfer/transfer";
import { NextFunction, Request, Response } from "express";

export class controllerTransfer{
    caseUseCreatedMovement: caseUseTransferMount
    caseUseFindMovements: caseUseFindTransfer

    constructor(caseUseTransfer:caseUseTransferMount,caseUseFindMovements: caseUseFindTransfer){
        this.caseUseCreatedMovement = caseUseTransfer
        this.caseUseFindMovements = caseUseFindMovements

        this.transfer = this.transfer.bind(this)
        this.findMovements = this.findMovements.bind(this)
    }

    async transfer(req:Request,res:Response,next:NextFunction){

        const movement: transferDto = req.body

        const movementCreated = await this.caseUseCreatedMovement.transfer(movement)
 
        if(!movementCreated.success){
            const error = {
                status:movementCreated.statusCode,
                message: movementCreated.error
            }
            return next(error)
        }

        res.status(movementCreated.statusCode).json({message:movementCreated.value})
    }

    async findMovements(req:Request,res:Response,next:NextFunction){
        const numberPhone = req.params.id

        const movementFinds = await this.caseUseFindMovements.findMovement(numberPhone)
        if(!movementFinds.success){
            const error={
                status:movementFinds.statusCode,
                message:movementFinds.error
            }
            return next(error)
        }

        res.status(movementFinds.statusCode).json({message:movementFinds.value})
    }
}