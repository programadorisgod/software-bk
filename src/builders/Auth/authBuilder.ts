import { AuthController } from "@controllers/auth/auth"
import { UseCaseAuthForgotPassword } from "@useCases/Auth/forgotPassword"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { UseCaseAuthRegister } from "@useCases/Auth/register"
import { UsecaseAuthResetPassword } from "@useCases/Auth/resetPassword"
import { Failure, Result, Success } from "@utils/results/results"

export class AuthControllerBuilder {
  private useCaseAuthLogin!: UseCaseAuthLogin
  private useCaseRegister!: UseCaseAuthRegister
  private useCaseForgotPassword!: UseCaseAuthForgotPassword
  private useCaseResetPassword!: UsecaseAuthResetPassword

  withAuthLogin(useCase: UseCaseAuthLogin): AuthControllerBuilder {
    this.useCaseAuthLogin = useCase
    return this
  }

  withAuthRegister(useCase: UseCaseAuthRegister): AuthControllerBuilder {
    this.useCaseRegister = useCase
    return this
  }
  withAuthForgotPassword(
    useCase: UseCaseAuthForgotPassword,
  ): AuthControllerBuilder {
    this.useCaseForgotPassword = useCase
    return this
  }

  withAuthResetPassword(
    useCase: UsecaseAuthResetPassword,
  ): AuthControllerBuilder {
    this.useCaseResetPassword = useCase
    return this
  }

  build(): Result<AuthController> {
    if (!this.useCaseAuthLogin)
      return Failure(
        "Use case AuthLogin is required for building AuthController",
      )
    if (!this.useCaseRegister)
      return Failure(
        "Use case Register is required for building AuthController",
      )

    if (!this.useCaseForgotPassword) {
      return Failure(
        "Use case ForgotPassword is required for building AuthController",
      )
    }
    if (!this.useCaseResetPassword) {
      return Failure(
        "Use case ResetPassword is required for building AuthController",
      )
    }

    return Success(
      new AuthController(
        this.useCaseAuthLogin,
        this.useCaseRegister,
        this.useCaseForgotPassword,
        this.useCaseResetPassword,
      ),
    )
  }
}
