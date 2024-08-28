import { router } from "@config/routerConfig";
import { BASE_URL } from "@constants/constants";
import { UserController } from "@controllers/users/user";
import { UserRepository } from "@Repository/user/repository";
import { UseCaseUserDelete } from "@useCases/users/delete";
import { UseCaseFindUser } from "@useCases/users/find";
import { UseCaseFindAllUser } from "@useCases/users/findAll";
import { UseCaseUpdateUser } from "@useCases/users/update";
import { UserControllerBuilder } from "builders/user/userBuilder";
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
export const createRouterUser = () => {
    const repository = new UserRepository();
    const useCaseFindAll = new UseCaseFindAllUser(repository);
    const useCaseFindById = new UseCaseFindUser(repository);
    const useCaseDelete = new UseCaseUserDelete(repository);
    const useCaseUpdate = new UseCaseUpdateUser(repository);
    //so as not to have an overloaded constructor
    const controller = new UserControllerBuilder()
        .withFindAll(useCaseFindAll)
        .withFindById(useCaseFindById)
        .withDelete(useCaseDelete)
        .withUpdate(useCaseUpdate)
        .build();
    if (controller instanceof UserController) {
        router.get(`${BASE_URL}/users`, controller.findAll);
        router.get(`${BASE_URL}/users/:id`, controller.findById);
        router.delete(`${BASE_URL}/users/:id`, controller.delete);
        router.put(`${BASE_URL}/users/:id`, controller.update);
    }
    else {
        console.log(`[Error] when building UserController: ${controller.error} `);
    }
    return router;
};