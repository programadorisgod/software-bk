import { RegisterDto } from "@Dtos/Auth/registerDto";
import { IFailure, ISuccess } from "@interfaces/Results/results";
import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseAuthRegister {
    private readonly repository;
    constructor(userRepository: UserRepository);
    create(userDto: RegisterDto): Promise<ISuccess<any> | IFailure<any>>;
}
