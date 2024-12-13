import { Request, Response, NextFunction } from "express";
import { OtpRepository,AuthRepository } from "../repository";
import { ResponseService } from "../view";
import { TokenService } from "../services";
import { sendVerificationCode } from "../services";
export class OtpController {
    static async verifyOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const { otp_id,user_id,otp_code } = req.body;
            const otp = await OtpRepository.verifyOTP(otp_id,user_id,otp_code);
            if(!otp){
                ResponseService.CreateErrorResponse("Invalid OTP or OTP Already Used", 401);
            }
            await OtpRepository.updateOTP(otp.id);
            if(otp.expires_at<new Date()){
                ResponseService.CreateErrorResponse("OTP expired", 401);
            }
            const user=await AuthRepository.verifyUser(otp.user_id);
            ResponseService.CreateSuccessResponse(
                200,
                "User verified successfully",
                {
                    id: user.id,
                    email: user.email,
                    is_verified: user.is_verified,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                },
                res
            );

        } catch (error) {
            next(error);
        }
    }

    static async resendOTP(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params.uid;
            const uid=Number(user_id);
            const user = await AuthRepository.getUserById(uid);
            if(!user){
                ResponseService.CreateErrorResponse("User not found", 404);
            }
            if(user.is_verified){
                ResponseService.CreateErrorResponse("User already verified", 401);
            }
            const otp =await TokenService.generateVerificationCode();
            const otpVal=await OtpRepository.createOTP(uid,otp.token,otp.expires);
            await sendVerificationCode(user.email,otpVal.otp_code,uid,otpVal.id);
            ResponseService.CreateSuccessResponse(
                200,
                "OTP sent successfully! Check Your email for Verification",
                {},
                res
            );
        } catch (error) {
            next(error);
        }
    }
}
