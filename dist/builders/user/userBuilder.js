import { UserController } from "@controllers/users/user";
import { Failure } from "@utils/results/results";
export class UserControllerBuilder {
    withFindAll(useCase) {
        this.useCaseFindAll = useCase;
        return this;
    }
    withFindById(useCase) {
        this.useCaseFindById = useCase;
        return this;
    }
    withDelete(useCase) {
        this.useCaseDelete = useCase;
        return this;
    }
    withUpdate(useCase) {
        this.useCaseUpdate = useCase;
        return this;
    }
    build() {
        if (!this.useCaseFindAll)
            return Failure("Use case FindAll is required");
        if (!this.useCaseFindById)
            return Failure("Use case FindById is required");
        if (!this.useCaseDelete)
            return Failure("Use case Delete is required");
        if (!this.useCaseUpdate)
            return Failure("Use case Update is required");
        return new UserController(this.useCaseFindAll, this.useCaseFindById, this.useCaseDelete, this.useCaseUpdate);
    }
}
