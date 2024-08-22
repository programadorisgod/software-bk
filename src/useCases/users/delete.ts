import { UserRepository } from "@Repository/user/repository"

export class UseCaseUserDelete {
  private readonly repository: UserRepository

  constructor(userRepository: UserRepository) {
    this.repository = userRepository
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id)
  }

}
