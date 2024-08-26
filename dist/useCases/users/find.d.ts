import { User } from "@Entity/user/user";
import { IFailure, ISuccess } from "@interfaces/Results/results";
import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseFindUser {
    private readonly repository;
    constructor(userRepository: UserRepository);
    find(id: string): Promise<ISuccess<User> | IFailure<string>>;
}
