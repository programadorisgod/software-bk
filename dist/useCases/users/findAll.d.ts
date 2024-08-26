import { User } from "@Entity/user/user";
import { IFailure, ISuccess } from "@interfaces/Results/results";
import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseFindAllUser {
    private readonly repository;
    constructor(userRepository: UserRepository);
    findAll(): Promise<ISuccess<User[]> | IFailure<string>>;
}
