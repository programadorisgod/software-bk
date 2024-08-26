import { UserController } from "@controllers/users/user";
import { IFailure } from "@interfaces/Results/results";
import { UseCaseUserDelete } from "@useCases/users/delete";
import { UseCaseFindUser } from "@useCases/users/find";
import { UseCaseFindAllUser } from "@useCases/users/findAll";
import { UseCaseUpdateUser } from "@useCases/users/update";
export declare class UserControllerBuilder {
    private useCaseFindAll;
    private useCaseFindById;
    private useCaseDelete;
    private useCaseUpdate;
    withFindAll(useCase: UseCaseFindAllUser): UserControllerBuilder;
    withFindById(useCase: UseCaseFindUser): UserControllerBuilder;
    withDelete(useCase: UseCaseUserDelete): UserControllerBuilder;
    withUpdate(useCase: UseCaseUpdateUser): UserControllerBuilder;
    build(): UserController | IFailure<string>;
}
