import { LoginDto } from "@Dtos/Auth/loginDto"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

export class UseCaseAuthLogin {
  private readonly repository: UserRepository

  constructor(userRepositroy: UserRepository) {
    this.repository = userRepositroy
  }

  async login(
    user: LoginDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const userFound = await this.repository.findById(user.phoneNumber)

      if (userFound instanceof Error) {
        return FailureProcess(userFound.message, 403)
      }

      if (!userFound) {
        //Return error 404 user not found
      }
      //rest of the logic

      return SuccessProcess("Your message", 200)
    } catch (error) {
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}
