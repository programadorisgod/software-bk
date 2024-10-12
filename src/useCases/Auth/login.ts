import { LoginDto } from "@Dtos/Auth/loginDto"
import { infoUserDto } from "@Dtos/users/userInfoDtos"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { tokenSing } from "@utils/JwtHelpers/handleJwt"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

import { compareSync } from "bcrypt-ts"
import { UserInfo } from "os"

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
      let userInfo:infoUserDto = new infoUserDto()

      userInfo.idUser = userFound.idUser
      userInfo.name = userFound.name
      userInfo.lastName = userFound.lastName
      userInfo.phoneNumber = userFound.phoneNumber
      userInfo.balance = userFound.balance

      // const tokenCreated = await tokenSing(userFound.phoneNumber)
      return SuccessProcess(userInfo, 200)
    } catch (error) {
      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}
