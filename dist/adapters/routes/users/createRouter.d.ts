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
export declare const createRouterUser: () => import("express-serve-static-core").Router;
