import { transferDto } from "@Dtos/transfer/transferDto";
import { caseUseTransferMount } from "@useCases/transfer/transfer";
import { NextFunction, Request, Response } from "express";

export class controllerTransfer{
    caseUseCreatedMovement: caseUseTransferMount

    constructor(caseUseTransfer:caseUseTransferMount){
        this.caseUseCreatedMovement = caseUseTransfer
        this.transfer = this.transfer.bind(this)
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
}