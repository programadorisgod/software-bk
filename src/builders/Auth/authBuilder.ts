import { AuthController } from "@controllers/auth/auth"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { UseCaseAuthRegister } from "@useCases/Auth/register"

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
    return new AuthController(this.useCaseAuthLogin, this.useCaseRegister)
  }
}
