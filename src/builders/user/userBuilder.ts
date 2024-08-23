import { UserController } from "@controllers/users/user"
import { IFailure } from "@interfaces/Results/results"
import { UseCaseUserDelete } from "@useCases/users/delete"
import { UseCaseFindUser } from "@useCases/users/find"
import { UseCaseFindAllUser } from "@useCases/users/findAll"
import { UseCaseUpdateUser } from "@useCases/users/update"
import { Failure } from "@utils/results/results"

export class UserControllerBuilder {
  private useCaseFindAll!: UseCaseFindAllUser
  private useCaseFindById!: UseCaseFindUser
  private useCaseDelete!: UseCaseUserDelete
  private useCaseUpdate!: UseCaseUpdateUser

  withFindAll(useCase: UseCaseFindAllUser): UserControllerBuilder {
    this.useCaseFindAll = useCase
    return this
  }

  withFindById(useCase: UseCaseFindUser): UserControllerBuilder {
    this.useCaseFindById = useCase
    return this
  }

  withDelete(useCase: UseCaseUserDelete): UserControllerBuilder {
    this.useCaseDelete = useCase
    return this
  }

  withUpdate(useCase: UseCaseUpdateUser): UserControllerBuilder {
    this.useCaseUpdate = useCase
    return this
  }

  build(): UserController | IFailure<string> {
    if (!this.useCaseFindAll) return Failure("Use case FindAll is required")

    if (!this.useCaseFindById) return Failure("Use case FindById is required")

    if (!this.useCaseDelete) return Failure("Use case Delete is required")

    if (!this.useCaseUpdate) return Failure("Use case Update is required")
    return new UserController(
      this.useCaseFindAll,
      this.useCaseFindById,
      this.useCaseDelete,
      this.useCaseUpdate,
    )
  }
}
