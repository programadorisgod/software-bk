import { LoginDto } from "@Dtos/Auth/loginDto"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { tokenSing } from "@utils/JwtHelpers/handleJwt"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

import { compareSync } from "bcrypt-ts"

export class UseCaseAuthLogin {
  private readonly repository: UserRepository

  constructor(userRepositroy: UserRepository) {
    this.repository = userRepositroy
  }

  async login(
    user: LoginDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const userFound = await this.repository.findByPhoneNumber(user.phoneNumber)

      if (userFound instanceof Error) {
        return FailureProcess(userFound.message, 403)
      }

      if (!userFound) {
        return FailureProcess("user does not exist", 404)
      }

      const resultDesencrytp = compareSync(user.password, userFound.password)

      if (!resultDesencrytp) {
        return FailureProcess("incorrect password or user", 404)
      }

      //const tokenCreated = await tokenSing(userFound.phoneNumber)
      
      return SuccessProcess(userFound, 200)
    } catch (error) {
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}
