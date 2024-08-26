import { UserRepository } from "@Repository/user/repository";
export declare class UseCaseUserDelete {
    private readonly repository;
    constructor(userRepository: UserRepository);
    delete(id: string): Promise<void>;
}
