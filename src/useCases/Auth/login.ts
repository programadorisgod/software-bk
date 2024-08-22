import { LoginDto } from "@Dtos/Auth/loginDto"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseAuthLogin {
  private readonly repository: UserRepository

  constructor(userRepositroy: UserRepository) {
    this.repository = userRepositroy
  }

  async login(user: LoginDto): Promise<ISuccess<any> | IFailure<any>> {
    try {
      const userFound = await this.repository.findById(user.phoneNumber)

      if (userFound instanceof Error) {
        return Failure(userFound.message)
      }

      if (!userFound) {
        //Return error 404 user not found
      }
      //rest of the logic

      return Success("Your message")
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
