import { AuthController } from "@controllers/auth/auth"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { UseCaseAuthRegister } from "@useCases/Auth/register"
import { Failure } from "@utils/results/results"

export class AuthControllerBuilder {
  private useCaseAuthLogin!: UseCaseAuthLogin
  private useCaseRegister!: UseCaseAuthRegister

  withAuthLogin(useCase: UseCaseAuthLogin): AuthControllerBuilder {
    this.useCaseAuthLogin = useCase
    return this
  }

  withAuthRegister(useCase: UseCaseAuthRegister): AuthControllerBuilder {
    this.useCaseRegister = useCase
    return this
  }

  build() {
    if (!this.useCaseAuthLogin)
      return Failure(
        "Use case AuthLogin is required for building AuthController",
      )
    if (!this.useCaseRegister)
      return Failure(
        "Use case Register is required for building AuthController",
      )
    return new AuthController(this.useCaseAuthLogin, this.useCaseRegister)
  }
}
