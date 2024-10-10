import { User } from "@Entity/user/user"
import { ICRUDRepository } from "@interfaces/Repository/crudRespository"

export class UserRepository implements ICRUDRepository<User> {
  async findAll(): Promise<User[] | Error> {
    const users = await User.find({
      relations: { movement: true, credit: true, bank: true },
    })
    return users
  }
  async findById(id: string): Promise<User | Error | null> {
    const user = await User.findOneBy({ idUser: id })
    return user
  }
  async save(data: User): Promise<void | Error> {
    await User.save(data)
  }
  async update(id: string, data: User): Promise<User | Error> {
    await User.findOneBy({ idUser: id })
    const userUpdated = await User.save(data)
    return userUpdated
  }
  async delete(id: string): Promise<void | Error> {
    await User.delete({ idUser: id })
  }
  async findByPhoneNumber(phoneNumber: string): Promise<User | Error | null> {
    const user = User.findOne({ where: { phoneNumber }, relations: { movement: true, credit: true, bank: true } })
    return user
  }
  async findByMailUser(email: string): Promise<User | Error | null> {
    const user = User.findOneBy({ email })
    return user
  }
}
