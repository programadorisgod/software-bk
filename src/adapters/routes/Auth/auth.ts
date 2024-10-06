import { router } from "@config/routerConfig"
import { LoginDto } from "@Dtos/Auth/loginDto"
import { RegisterDto } from "@Dtos/Auth/registerDto"
import { UserRepository } from "@Repository/user/repository"
import { UseCaseAuthLogin } from "@useCases/Auth/login"
import { UseCaseAuthRegister } from "@useCases/Auth/register"
import { AuthControllerBuilder } from "@builders/Auth/authBuilder"
import { Router } from "express"
import { UseCaseAuthForgotPassword } from "@useCases/Auth/forgotPassword"
import { ForgotPasswordDto } from "@Dtos/Auth/forgotPasswordDto"
import { checkToken } from "@middlewares/handleJwt"
import { registerRoute } from "@adapters/config/routerConfig"
import { UsecaseAuthResetPassword } from "@useCases/Auth/resetPassword"
import { resetPasswordDto } from "@Dtos/Auth/resetPassword"

/**
 * Creates and configures the authentication router.
 *
 * This function sets up the routes for authentication (login and registration)
 * by initializing the required use cases, building the authentication controller,
 * and then assigning the routes to the Express router.
 *
 * @returns {Router} The function does not return anything; it configures the router directly.
 *
 * @example
 * // Integrating the authentication router in the main application
 * const app = express();
 * createRouterAuth(); // Sets up the auth routes
 * app.use(router); // Apply the configured routes to the Express app
 */

export const createRouterAuth = (): Router => {
  const repository = new UserRepository()

  const useCaseLogin = new UseCaseAuthLogin(repository)
  const useCaseRegister = new UseCaseAuthRegister(repository)
  const useCaseForgotPassword = new UseCaseAuthForgotPassword(repository)
  const usecaseResetPassword = new UsecaseAuthResetPassword(repository)

  const authController = new AuthControllerBuilder()
    .withAuthLogin(useCaseLogin)
    .withAuthRegister(useCaseRegister)
    .withAuthForgotPassword(useCaseForgotPassword)
    .withAuthResetPassword(usecaseResetPassword)
    .build()

  if (authController.success) {
    registerRoute(router, "/auth/login", LoginDto, authController.value.login)
    registerRoute(
      router,
      "/auth/register",
      RegisterDto,
      authController.value.register,
    )
    registerRoute(
      router,
      "/auth/forgot-password",
      ForgotPasswordDto,
      authController.value.forgotPassword,
      checkToken,
    )
    registerRoute(
      router,
      "/auth/reset-password",
      resetPasswordDto,
      authController.value.resetPassword,
    )
  } else {
    console.error(`Error when building AuthController: ${authController.error}`)
  }

  return router
}
