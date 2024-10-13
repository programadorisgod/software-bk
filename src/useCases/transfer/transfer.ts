import { movementRealizedDto } from "@Dtos/transfer/movementDto";
import { transferDto } from "@Dtos/transfer/transferDto";
import { infoUserDto } from "@Dtos/users/userInfoDtos";
import { Movement } from "@Entity/movement/movement";
import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { movementRepository } from "@Repository/movement/repository";
import { UserRepository } from "@Repository/user/repository";
import { getDateColombia } from "@utils/Date/date";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";

import { randomUUID } from "crypto";

export class caseUseTransferMount{
    repositoryUser: UserRepository
    repositoryMovement: movementRepository

    constructor(repositoryUser:UserRepository,repositoryMovement: movementRepository){
        this.repositoryUser = repositoryUser
        this.repositoryMovement = repositoryMovement
    }
    
    async transfer(data:transferDto):Promise<ISuccessProcess<any>|IFailureProcess<any> >{
        try {
            const amountVerify = await this.repositoryUser.findByPhoneNumber(data.phoneNumber)
            const userDebit= await this.repositoryUser.findByPhoneNumber(data.destination)

            const userInfo:infoUserDto = new infoUserDto()
            const movementInfo:movementRealizedDto = new movementRealizedDto()
            
            if(!amountVerify || !userDebit) return FailureProcess('Not Found User',404)
            if(amountVerify instanceof Error || userDebit instanceof Error) return FailureProcess(amountVerify.name, 403)  
            if(amountVerify.balance < data.omuntMovement) return FailureProcess('dont have enough balance',403)
                        
            userInfo.idUser = userDebit.idUser
            userInfo.name = userDebit.name
            userInfo.lastName = userDebit.lastName
            userInfo.phoneNumber = userDebit.phoneNumber
            userInfo.balance = userDebit.balance

            const amount = parseInt(userDebit.balance.toString()) + parseInt(data.omuntMovement.toString())

            await this.repositoryUser.updateBalance(data.destination,amount)// update the balace the count destination 

            const amountNew = amountVerify.balance - data.omuntMovement

            this.repositoryUser.updateBalance(amountVerify.phoneNumber,amountNew)

            const movementDebit = new Movement()// movimiento para el que recibe
            movementDebit.idMovement = randomUUID()
            movementDebit.description = data.description
            movementDebit.dateMovement = getDateColombia()
            movementDebit.omuntMovement = data.omuntMovement
            movementDebit.origin = data.phoneNumber
            movementDebit.user = userDebit
            movementDebit.typeTransfer = 'Debito'

            movementInfo.user = userInfo
            movementInfo.dateMovement = movementDebit.dateMovement
            movementInfo.description = data.description
            movementInfo.idMovement = movementDebit.idMovement
            movementInfo.omuntMovement = movementDebit.omuntMovement
            movementInfo.typeTransfer = movementDebit.typeTransfer

            const movementCredit = new Movement()// movimiento  que desembolsa plata
            movementCredit.idMovement = randomUUID()
            movementCredit.description = data.description
            movementCredit.dateMovement = getDateColombia()
            movementCredit.omuntMovement = data.omuntMovement
            movementCredit.destination = userDebit.phoneNumber
            movementCredit.user = amountVerify
            movementCredit.typeTransfer= 'Credito'

            await this.repositoryMovement.save(movementCredit)
            
            await this.repositoryMovement.save(movementDebit)

            return SuccessProcess(movementInfo,200)
        } catch (error) {
            console.log(error)
            return FailureProcess('internal sever error',505)
        }
    }
}