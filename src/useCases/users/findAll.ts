import { User } from "@Entity/user/user"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseFindAllUser {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async findAll(): Promise<ISuccess<User[]> | IFailure<string>> {
    try {
      const users = await this.repository.findAll()

      if (users instanceof Error) {
        return Failure(users.message)
      }

      return Success(users)
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
