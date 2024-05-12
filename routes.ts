/**
 * An array of public routes.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
   "/",
   "/auth/verify-email"
];

/**
 * An array of authenticated routes.
 * @type {string[]}
 */
export const authRoutes = [
   "/dashboard",
   "/auth/error",
   "/auth/login",
   "/auth/register",
   "/auth/reset",
   "/auth/new-password",
];
/**
 * The path to which the user will be redirected after authentication.
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"



/**
 * The prefix for authentication API routes.
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";


