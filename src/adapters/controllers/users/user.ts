import { UseCaseUserDelete } from "@useCases/users/delete"
import { UseCaseFindUser } from "@useCases/users/find"
import { UseCaseFindAllUser } from "@useCases/users/findAll"
import { UseCaseUpdateUser } from "@useCases/users/update"

export class UserController {
  private useCaseFindAll!: UseCaseFindAllUser
  private useCaseFindById!: UseCaseFindUser
  private useCaseDelete!: UseCaseUserDelete
  private useCaseUpdate!: UseCaseUpdateUser
  constructor(
    useCaseFindAll: UseCaseFindAllUser,
    useCaseFindById: UseCaseFindUser,
    useCaseDelete: UseCaseUserDelete,
    useCaseUpdate: UseCaseUpdateUser,
  ) {
    this.useCaseFindAll = useCaseFindAll
    this.useCaseFindById = useCaseFindById
    this.useCaseDelete = useCaseDelete
    this.useCaseUpdate = useCaseUpdate
  }

  async findAll() {
    return await this.useCaseFindAll.findAll()
  }

  async findById(id: string) {
    return await this.useCaseFindById.find(id)
  }

  async delete(id: string) {
    return await this.useCaseDelete.delete(id)
  }

  async update(id: string, data: any) {
    return await this.useCaseUpdate.update(id, data)
  }
}
