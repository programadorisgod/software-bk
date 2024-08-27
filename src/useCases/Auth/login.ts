import { LoginDto } from "@Dtos/Auth/loginDto"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { tokenSing } from "@utils/JwtHelpers/handleJwt"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"
import { Validation } from "adapters/middleware/validator"

export class UseCaseAuthLogin {
  private readonly repository: UserRepository

  constructor(userRepositroy: UserRepository) {
    this.repository = userRepositroy
  }

  async login(
    user: LoginDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      Validation.phoneNumber(user.phoneNumber)
      Validation.password(user.password)

      const userFound = await this.repository.findById(user.phoneNumber)

      if (userFound instanceof Error) {
        return FailureProcess(userFound.message, 403)
      }

      if (!userFound) {
        return FailureProcess("user does not exist", 404)
      }
      const tokenCreated = tokenSing(userFound.phoneNumber)
      // Y COMO DEVUELVO ESTA CAGA
      return SuccessProcess("Your message", 200)
    } catch (error) {
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}
