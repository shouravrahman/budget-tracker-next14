/**
 * An array of public routes.
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
   "/"
];

/**
 * An array of authenticated routes.
 * @type {string[]}
 */
export const authRoutes = [
   "/dashboard",
   "/profile",
   "/auth/login",
   "/auth/register"
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


