import { User } from "@Entity/user/user"
import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

export class UseCaseFindUserByPhone {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async findByPhone(Userid: string): Promise<ISuccessProcess<User> | IFailureProcess<string>> {
    try {
      const user = await this.repository.findByPhoneNumber(Userid)

      if (user instanceof Error || !user) {
        return FailureProcess(user?.message || "user not found", 404)
      }

      return SuccessProcess(user,200)
    } catch (error) {
      return FailureProcess("An unexpected error occurred",500)
    }
  }
}
