import { UseCaseUserDelete } from "@useCases/users/delete"
import { UseCaseFindUser } from "@useCases/users/find"
import { UseCaseFindAllUser } from "@useCases/users/findAll"
import { UseCaseUpdateUser } from "@useCases/users/update"

export class UserController {
  private _useCaseFindAll!: UseCaseFindAllUser
  private _useCaseFindById!: UseCaseFindUser
  private _useCaseDelete!: UseCaseUserDelete
  private _useCaseUpdate!: UseCaseUpdateUser
  constructor(
    useCaseFindAll: UseCaseFindAllUser,
    useCaseFindById: UseCaseFindUser,
    useCaseDelete: UseCaseUserDelete,
    useCaseUpdate: UseCaseUpdateUser,
  ) {
    this._useCaseFindAll = useCaseFindAll
    this._useCaseFindById = useCaseFindById
    this._useCaseDelete = useCaseDelete
    this._useCaseUpdate = useCaseUpdate

    // It is good practice to bind this context to the methods of the class to ensure that the method runs what it is.
    this.findAll = this.findAll.bind(this)
    this.findById = this.findById.bind(this)
    this.delete = this.delete.bind(this)
    this.update = this.update.bind(this)
  }

  async findAll() {
    return await this._useCaseFindAll.findAll()
  }

  async findById(id: string) {
    return await this._useCaseFindById.find(id)
  }

  async delete(id: string) {
    return await this._useCaseDelete.delete(id)
  }

  async update(id: string, data: any) {
    return await this._useCaseUpdate.update(id, data)
  }
}
