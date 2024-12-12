import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { AuthController } from '../controllers/auth.controller';
import { AuthValidator } from '../validators/auth.validator';
class AuthRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
    }
    postRoutes(){
        this.router.post('/register',AuthValidator.registerUser(),GlobalMiddleware.CheckValidationResult,AuthController.registerUser);
        this.router.post('/login',AuthValidator.loginUser(),GlobalMiddleware.CheckValidationResult,AuthController.loginUser);
    }
}
export default new AuthRoute().router;