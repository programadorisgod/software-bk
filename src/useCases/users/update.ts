import { UserDto } from "@Dtos/users/userDto"
import { User } from "@Entity/user/user"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class  UseCaseUpdateUser {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async update(
    id: string,
    data: UserDto,
  ): Promise<ISuccess<User> | IFailure<string>> {
    try {
      const user = await this.repository.update(id, data)

      if (user instanceof Error) {
        return Failure(user.message)
      }

      return Success(user)
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
