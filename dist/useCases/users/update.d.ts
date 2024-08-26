import { UserDto } from "@Dtos/users/userDto";
import { User } from "@Entity/user/user";
import { IFailure, ISuccess } from "@interfaces/Results/results";
import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseUpdateUser {
    private readonly repository;
    constructor(userRepository: UserRepository);
    update(id: string, data: UserDto): Promise<ISuccess<User> | IFailure<string>>;
}
