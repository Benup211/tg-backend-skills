import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";
class AuthRoute {
    public router: Router = Router();
    constructor() {
        /**
         * @swagger
         * tags:
         *   name: Auth
         *   description: Authentication routes
         */
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {}
    postRoutes() {
        /**
         * @swagger
         * /api/auth/register:
         *   post:
         *     summary: Register a new user
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *               confirmPassword:
         *                 type: string   
         *     responses:
         *       200:
         *         description: User registered successfully
         *       400:
         *         description: Validation error
         */
        this.router.post(
            "/register",
            AuthValidator.registerUser(),
            GlobalMiddleware.CheckValidationResult,
            AuthController.registerUser
        );

        /**
         * @swagger
         * /api/auth/login:
         *   post:
         *     summary: Log in a user
         *     tags: [Auth]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               email:
         *                 type: string
         *               password:
         *                 type: string
         *     responses:
         *       200:
         *         description: User logged in successfully
         *       400:
         *         description: Validation error
         */
        this.router.post(
            "/login",
            AuthValidator.loginUser(),
            GlobalMiddleware.CheckValidationResult,
            AuthController.loginUser
        );
    }
}
export default new AuthRoute().router;
