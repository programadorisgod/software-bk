import { controllerTransfer } from "@controllers/transfer/transfer";
import { IFailure } from "@interfaces/Results/results";
import { caseUseTransferMount } from "@useCases/transfer/transfer";
import { Failure } from "@utils/results/results";

export class ControllerTransferBuilder{
    private caseUse!:caseUseTransferMount

    withTransfer(useCase:caseUseTransferMount):ControllerTransferBuilder{
        this.caseUse = useCase
        return this
    }
    build(): controllerTransfer | IFailure<string> {
        if (!this.caseUse) return Failure("Use case Register is required")
        return new controllerTransfer(this.caseUse)
      }
} 