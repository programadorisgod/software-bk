import { RegisterDto } from "@Dtos/Auth/registerDto"
import { User } from "@Entity/user/user"
import { ICRUDRepository } from "@interfaces/Repository/crudRespository"

export class UserRepository implements ICRUDRepository<User> {
  async findAll(): Promise<User[] | Error> {
    throw new Error("Method not implemented.")
  }
  async findById(id: number | string): Promise<User | Error> {
    throw new Error("Method not implemented.")
  }
  async save(data: RegisterDto): Promise<void | Error> {
    throw new Error("Method not implemented.")
  }
  async update(id: string, data: User): Promise<User | Error> {
    throw new Error("Method not implemented.")
  }
  async delete(id: string): Promise<void | Error> {
    throw new Error("Method not implemented.")
  }
}
