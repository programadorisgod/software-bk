import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI";
import { movementRepository } from "@Repository/movement/repository";
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI";

export class caseUseFindTransfer{
    private readonly repository:movementRepository

    constructor(repo:movementRepository){
        this.repository = repo
    }

    async findMovement(numberPhone:string):Promise<IFailureProcess<any>| ISuccessProcess<any>>{
        try {
            const movements = await this.repository.findByNumberPhone(numberPhone)

            if(!movements) return FailureProcess('Not Found Movements',404)
            
            return SuccessProcess(movements,200)
        } catch (error) {

            return FailureProcess("Error internal server",505)
        }

    }
}