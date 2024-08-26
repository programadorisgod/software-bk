import { LoginDto } from "@Dtos/Auth/loginDto";
import { IFailure, ISuccess } from "@interfaces/Results/results";
import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseAuthLogin {
    private readonly repository;
    constructor(userRepositroy: UserRepository);
    login(user: LoginDto): Promise<ISuccess<any> | IFailure<any>>;
}
