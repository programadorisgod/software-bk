import { router } from "@config/routerConfig"
import { BASE_URL } from "@constants/constants"
import { UserController } from "@controllers/users/user"
import { UserRepository } from "@Repository/user/repository"
import { UseCaseUserDelete } from "@useCases/users/delete"
import { UseCaseFindUser } from "@useCases/users/find"
import { UseCaseFindAllUser } from "@useCases/users/findAll"
import { UseCaseUpdateUser } from "@useCases/users/update"
import { checkToken } from "@adapters/middleware/handleJwt"
import { Router } from "express"
import { UserControllerBuilder } from "@builders/user/userBuilder"
import { UseCaseFindUserByPhone } from "@useCases/users/findByPhone"

/**
 * Create and configure the router for user-related routes.
 *
 * This function initialises the required use cases, configures a user driver using the Builder pattern, and assigns corresponding routes for user CRUD operations.
 * using the Builder pattern, and assigns the corresponding routes for user CRUD operations.
 *
 * @returns The router configured with the user routes.
 *
 * @example
 * // Bind the user router in the main application.
 * const app = express();
 * app.use(createRouterUser());
 */

export const createRouterUser = (): Router => {
  const repository = new UserRepository()

  const useCaseFindAll = new UseCaseFindAllUser(repository)
  const useCaseFindById = new UseCaseFindUser(repository)
  const useCaseDelete = new UseCaseUserDelete(repository)
  const useCaseUpdate = new UseCaseUpdateUser(repository)
  const useCaseFindByPhone = new UseCaseFindUserByPhone(repository)

  //so as not to have an overloaded constructor
  const controller = new UserControllerBuilder()
    .withFindAll(useCaseFindAll)
    .withFindById(useCaseFindById)
    .withDelete(useCaseDelete)
    .withUpdate(useCaseUpdate)
    .withFindByPhone(useCaseFindByPhone)
    .build()

  if (controller instanceof UserController) {
    router.get(`${BASE_URL}/users`, checkToken, controller.findAll)
    router.get(`${BASE_URL}/users/:id`, checkToken, controller.findById)
    router.get(`${BASE_URL}/users/phone/:id`, checkToken, controller.findByPhone)
    router.delete(`${BASE_URL}/users/:id`, checkToken, controller.delete)
    router.put(`${BASE_URL}/users/:id`, checkToken, controller.update)
  } else {
    console.log(`[Error] when building UserController: ${controller.error} `)
  }

  return router
}
