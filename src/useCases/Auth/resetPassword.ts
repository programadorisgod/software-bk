import { EmailService } from "@adapters/services/email"
import { resetPasswordDto } from "@Dtos/Auth/resetPassword"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"
import { compare, genSalt, hash } from "bcrypt-ts"

export class UsecaseAuthResetPassword {
  constructor(private userRepository: UserRepository) {}

  async resetPassword(
    input: resetPasswordDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    const { email, ip, newPassword, token, userAgent } = input

    const userFound = await this.userRepository.findByMailUser(email)

    if (userFound instanceof Error) {
      return FailureProcess(userFound.message, 403)
    }

    if (!userFound) {
      return FailureProcess("user does not exist", 404)
    }

    const validToken = await compare(token, userFound.auth_token.toString())

    if (!validToken)
      return FailureProcess("invalid token, password not updated", 403)

    const dateNow = Date.now()

    if (dateNow > userFound.expiry_token)
      return FailureProcess("expired token, password not updated", 403)

    const salt = await genSalt(10)
    const hashPassword = await hash(newPassword, salt)

    userFound.auth_token = ""
    userFound.expiry_token = 0
    userFound.password = hashPassword

    const userPasswordUpdate = await this.userRepository.update(
      email,
      userFound,
    )

    if (userPasswordUpdate instanceof Error)
      return FailureProcess("error when updating the password", 400)

    const sentEmail = await EmailService.sendEmailUpdatedPassword({
      email,
      name: userFound.name,
      ip,
      userAgent,
    })

    if (!sentEmail.success)
      return FailureProcess(
        "Error when sending mail, but password updated",
        500,
      )

    return SuccessProcess("updated password and email sent", 200)
  }
}
