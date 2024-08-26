import { UserDto } from "@Dtos/users/userDto"
import { Bank } from "@Entity/bank/bank"
import { User } from "@Entity/user/user"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseUpdateUser {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async update(
    id: string,
    data: UserDto,
  ): Promise<ISuccess<User> | IFailure<string>> {
    try {
      const userExists = await this.repository.findById(id)

      if (userExists instanceof Error || !userExists) {
        return Failure(userExists?.message || "user not found")
      }

      const newUser = new User()
      newUser.idUser = id
      newUser.name = data.name
      newUser.email = data.email
      newUser.password = data.password
      newUser.phoneNumber = data.phoneNumber
      newUser.age = data.age
      newUser.bank = {} as Bank
      newUser.credit = []
      newUser.movement = []
      newUser.faceImage = []

      const user = await this.repository.update(id, newUser)

      if (user instanceof Error) {
        return Failure(user.message)
      }

      return Success(user)
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
