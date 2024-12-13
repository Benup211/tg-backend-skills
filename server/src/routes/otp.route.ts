import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { OtpController } from '../controllers';
import { OtpValidator } from '../validators';
class OtpRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get('/resend-otp/:uid',OtpValidator.resendOTP(),GlobalMiddleware.CheckValidationResult,OtpController.resendOTP);
    }
    postRoutes(){
        this.router.post('/verify-otp',OtpValidator.verifyOTP(),GlobalMiddleware.CheckValidationResult,OtpController.verifyOTP);
    }
}
export default new OtpRoute().router;