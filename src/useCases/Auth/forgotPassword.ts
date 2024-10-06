import { EmailService } from "@adapters/services/email"
import { ForgotPasswordDto } from "@Dtos/Auth/forgotPasswordDto"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"
import {
  isEmail,
  isPhoneNumber,
} from "@utils/validate/validateInputsForgotPassword"
import { genSalt, hash } from "bcrypt-ts"
import { randomUUID } from "crypto"

interface IgenerateToken {
  hash_token: string
  expiry_token: number
  token: string
}
interface ResetUrlProps {
  email: string
  token: string
}

export class UseCaseAuthForgotPassword {
  constructor(private userRespository: UserRepository) {}

  private async generateToken(): Promise<IgenerateToken> {
    const token = randomUUID()
    const salt = await genSalt(10)
    const hash_token = await hash(token, salt)
    const expiry_token = new Date(Date.now() + 30 * 60 * 1000).getTime()

    return { hash_token, expiry_token, token }
  }

  private generateResetUrl({ email, token }: ResetUrlProps): string {
    const url = `https://api-software-economico.up.railway.app/api/v1/auth/view/reset-password`
    const emailEncode = encodeURIComponent(email)
    const resetUrl = `${url}?token=${token}&email=${emailEncode}`
    return resetUrl
  }

  async forgotPassword(
    inputUser: ForgotPasswordDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    const { input } = inputUser

    let userFound = null

    if (isEmail(input)) {
      userFound = await this.userRespository.findByMailUser(input)
    }

    if (isPhoneNumber(input)) {
      userFound = await this.userRespository.findByPhoneNumber(input)
    }

    if (userFound instanceof Error) {
      return FailureProcess(userFound.message, 403)
    }

    if (!userFound) {
      return FailureProcess("user does not exist", 404)
    }
    const { hash_token, expiry_token, token } = await this.generateToken()

    userFound.auth_token = hash_token
    userFound.expiry_token = expiry_token

    await this.userRespository.update(userFound.idUser, userFound)

    const resetUrl = this.generateResetUrl({ email: userFound.email, token })

    const mailSent = await EmailService.sendEmail(
      userFound.email,
      userFound.name,
      resetUrl,
    )
    if (!mailSent.success) {
      return FailureProcess(mailSent.error, mailSent.statusCode)
    }

    return SuccessProcess(mailSent.value, mailSent.statusCode)
  }
}
