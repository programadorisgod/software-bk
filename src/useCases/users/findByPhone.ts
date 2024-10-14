import { User } from "@Entity/user/user"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseFindUserByPhone {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async findByPhone(Userid: string): Promise<ISuccess<User> | IFailure<string>> {
    try {
      const user = await this.repository.findByPhoneNumber(Userid)

      if (user instanceof Error || !user) {
        return Failure(user?.message || "user not found")
      }

      return Success(user)
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
