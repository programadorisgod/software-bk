import { UseCaseUserDelete } from "@useCases/users/delete";
import { UseCaseFindUser } from "@useCases/users/find";
import { UseCaseFindAllUser } from "@useCases/users/findAll";
import { UseCaseUpdateUser } from "@useCases/users/update";
export declare class UserController {
    private useCaseFindAll;
    private useCaseFindById;
    private useCaseDelete;
    private useCaseUpdate;
    constructor(useCaseFindAll: UseCaseFindAllUser, useCaseFindById: UseCaseFindUser, useCaseDelete: UseCaseUserDelete, useCaseUpdate: UseCaseUpdateUser);
    findAll(): Promise<import("../../interfaces/Results/results").IFailure<string> | import("../../interfaces/Results/results").ISuccess<import("../../../Entity/user/user").User[]>>;
    findById(id: string): Promise<import("../../interfaces/Results/results").IFailure<string> | import("../../interfaces/Results/results").ISuccess<import("../../../Entity/user/user").User>>;
    delete(id: string): Promise<void>;
    update(id: string, data: any): Promise<import("../../interfaces/Results/results").IFailure<string> | import("../../interfaces/Results/results").ISuccess<import("../../../Entity/user/user").User>>;
}
