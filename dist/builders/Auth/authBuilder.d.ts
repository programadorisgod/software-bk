import { AuthController } from "@controllers/auth/auth";
import { UseCaseAuthLogin } from "@useCases/Auth/login";
import { UseCaseAuthRegister } from "@useCases/Auth/register";
export declare class AuthControllerBuilder {
    private useCaseAuthLogin;
    private useCaseRegister;
    withAuthLogin(useCase: UseCaseAuthLogin): AuthControllerBuilder;
    withAuthRegister(useCase: UseCaseAuthRegister): AuthControllerBuilder;
    build(): import("../../adapters/interfaces/Results/results").IFailure<string> | AuthController;
}
