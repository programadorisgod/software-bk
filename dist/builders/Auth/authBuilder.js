import { AuthController } from "@controllers/auth/auth";
import { Failure } from "@utils/results/results";
export class AuthControllerBuilder {
    withAuthLogin(useCase) {
        this.useCaseAuthLogin = useCase;
        return this;
    }
    withAuthRegister(useCase) {
        this.useCaseRegister = useCase;
        return this;
    }
    build() {
        if (!this.useCaseAuthLogin)
            return Failure("Use case AuthLogin is required for building AuthController");
        if (!this.useCaseRegister)
            return Failure("Use case Register is required for building AuthController");
        return new AuthController(this.useCaseAuthLogin, this.useCaseRegister);
    }
}
