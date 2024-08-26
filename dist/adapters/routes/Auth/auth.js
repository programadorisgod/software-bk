import { router } from "@config/routerConfig";
import { BASE_URL } from "@constants/constants";
import { AuthController } from "@controllers/auth/auth";
import { LoginDto } from "@Dtos/Auth/loginDto";
import { RegisterDto } from "@Dtos/Auth/registerDto";
import { UserRepository } from "@Repository/user/repository";
import { UseCaseAuthLogin } from "@useCases/Auth/login";
import { UseCaseAuthRegister } from "@useCases/Auth/register";
import { validateDto } from "adapters/middleware/validator";
import { AuthControllerBuilder } from "builders/Auth/authBuilder";
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
export const createRouterAuth = () => {
    const repository = new UserRepository();
    const useCaseAuthLogin = new UseCaseAuthLogin(repository);
    const useCaseRegister = new UseCaseAuthRegister(repository);
    const authController = new AuthControllerBuilder()
        .withAuthLogin(useCaseAuthLogin)
        .withAuthRegister(useCaseRegister)
        .build();
    if (authController instanceof AuthController) {
        router.post(`${BASE_URL}/auth/login`, validateDto(LoginDto), authController.login);
        router.post(`${BASE_URL}/auth/register`, validateDto(RegisterDto), authController.register);
    }
    else {
        console.log(`Error when building AuthController: ${authController.error}`);
    }
    return router;
};
