import { User } from "@Entity/user/user";
import { ICRUDRepository } from "@interfaces/Repository/crudRespository";
export declare class UserRepository implements ICRUDRepository<User> {
    findAll(): Promise<User[] | Error>;
    findById(id: string): Promise<User | Error | null>;
    save(data: User): Promise<void | Error>;
    update(id: string, data: User): Promise<User | Error>;
    delete(id: string): Promise<void | Error>;
}
