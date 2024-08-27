import { RegisterDto } from "@Dtos/Auth/registerDto"
import { Bank } from "@Entity/bank/bank"
import { User } from "@Entity/user/user"
import {
  IFailureProcess,
  ISuccessProcess,
} from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"

export class UseCaseAuthRegister {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async create(
    userDto: RegisterDto,
  ): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
      const newUser = new User()
      newUser.idUser = userDto.id
      newUser.name = userDto.name
      newUser.lastName = userDto.lastName
      newUser.email = userDto.email
      newUser.phoneNumber = userDto.phoneNumber
      newUser.password = userDto.password
      newUser.faceImage = []
      newUser.age = 0
      newUser.movement = []
      newUser.bank = {} as Bank
      newUser.credit = []

      const userCreated = await this.repository.save(newUser)

      if (userCreated instanceof Error) {
        return FailureProcess(userCreated.message, 403)
      }

      return SuccessProcess("User created succesfully", 201)
    } catch (error) {
      console.log(error)

      return FailureProcess("An unexpected error occurred", 500)
    }
  }
}
