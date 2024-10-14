import { IFailureProcess, ISuccessProcess } from "@interfaces/Results/resultsAPI"
import { UserRepository } from "@Repository/user/repository"
import { FailureProcess, SuccessProcess } from "@utils/results/resultsAPI"
import { isEmail, isPhoneNumber } from "@utils/validate/validateInputsForgotPassword"

export class UseCaseCreditEnd {
  private readonly repository: UserRepository

  constructor(UserRepository: UserRepository) {
    this.repository = UserRepository
  }

  async End(userId: string): Promise<ISuccessProcess<any> | IFailureProcess<any>> {
    try {
        let userFound = null

        if (isEmail(userId)) {
          userFound = await this.repository.findByMailUser(userId)
        }
          
        if (isPhoneNumber(userId)) {
          userFound = await this.repository.findByPhoneNumber(userId)
        }
          
        if (userFound instanceof Error) {
          return FailureProcess(userFound.message, 403)
        }
          
        if (!userFound) {
          return FailureProcess("user does not exist", 404)
        }
        
        userFound.credit[0].creditStatus = "Liquidado"
        return SuccessProcess("Credit liquidated succesfully", 200)
    } catch (error) {
      console.log(error)
      return FailureProcess("An unexpected error occurred", 500)
    }
    
  }
}