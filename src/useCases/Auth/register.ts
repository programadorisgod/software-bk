import { RegisterDto } from "@Dtos/Auth/registerDto"
import { Bank } from "@Entity/bank/bank"
import { User } from "@Entity/user/user"
import { IFailure, ISuccess } from "@interfaces/Results/results"
import { UserRepository } from "@Repository/user/repository"
import { Failure, Success } from "@utils/results/results"

export class UseCaseAuthRegister {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async create(userDto: RegisterDto): Promise<ISuccess<any> | IFailure<any>> {
    try {

      const newUser = new User()
          newUser.id = userDto.id
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
        return Failure(userCreated.message)
      }

      return Success("User created succesfully")
    } catch (error) {
      return Failure("An unexpected error occurred")
    }
  }
}
