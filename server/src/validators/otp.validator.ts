import { body,param} from "express-validator";

export class OtpValidator {
    static verifyOTP() {
        return [
            body("otp_id").notEmpty().withMessage("OTP id is required"),
            body("user_id").notEmpty().withMessage("User id is required"),
            body("otp_code").notEmpty().withMessage("OTP code is required"),
        ];
    }
    static resendOTP() {
        return [
            param("uid").notEmpty().withMessage("User id is required"),
        ];
    }
}
