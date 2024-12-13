import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { OtpController } from "../controllers";
import { OtpValidator } from "../validators";
class OtpRoute {
    public router: Router = Router();
    constructor() {
        /**
         * @swagger
         * tags:
         *   name: OTP
         *   description: OTP management routes
         */
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        /**
         * @swagger
         * /api/otp/resend-otp/{uid}:
         *   get:
         *     summary: Resend OTP
         *     tags: [OTP]
         *     parameters:
         *       - in: path
         *         name: uid
         *         schema:
         *           type: number
         *         required: true
         *         description: User ID
         *     responses:
         *       200:
         *         description: OTP resent successfully
         *       404:
         *         description: User not found
         */
        this.router.get(
            "/resend-otp/:uid",
            OtpValidator.resendOTP(),
            GlobalMiddleware.CheckValidationResult,
            OtpController.resendOTP
        );
    }
    postRoutes() {
        /**
         * @swagger
         * /api/otp/verify-otp:
         *   post:
         *     summary: Verify OTP
         *     tags: [OTP]
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               otp_id:
         *                 type: number
         *                 description: OTP id
         *               user_id:
         *                 type: number
         *                 description: User id
         *               otp_code:
         *                 type: number
         *                 description: OTP code in the mail
         *     responses:
         *       200:
         *         description: OTP verified successfully
         *       400:
         *         description: Validation error
         */
        this.router.post(
            "/verify-otp",
            OtpValidator.verifyOTP(),
            GlobalMiddleware.CheckValidationResult,
            OtpController.verifyOTP
        );
    }
}
export default new OtpRoute().router;
