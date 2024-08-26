import { Router } from "express";
/**
 * Creates and configures the authentication router.
 *
 * This function sets up the routes for authentication (login and registration)
 * by initializing the required use cases, building the authentication controller,
 * and then assigning the routes to the Express router.
 *
 * @returns {Router} The function does not return anything; it configures the router directly.
 *
 * @example
 * // Integrating the authentication router in the main application
 * const app = express();
 * createRouterAuth(); // Sets up the auth routes
 * app.use(router); // Apply the configured routes to the Express app
 */
export declare const createRouterAuth: () => Router;
