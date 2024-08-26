import { RegisterDto } from "@Dtos/Auth/registerDto"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseAuthRegister {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async create(user: RegisterDto): Promise<ISuccess<any> | IFailure<any>> {
    try {
      const newUser = await this.repository.save(user)

      if (newUser instanceof Error) {
        return Failure(newUser.message)
      }

      return Success("User created succesfully")
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
