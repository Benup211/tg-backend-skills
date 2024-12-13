import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../repository";
import { ResponseService } from "../view";
import { UserService,JwtService } from "../services";
import { OtpRepository } from "../repository";
import { TokenService } from "../services";
import { sendVerificationCode } from "../services";

export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const checkUser = await AuthRepository.getUserByEmail(email);
            if (checkUser) {
                ResponseService.CreateErrorResponse("User already exists", 409);
            }
            const hashedPassword = await UserService.hashPassword(password);
            const user = await AuthRepository.createUser(email, hashedPassword);
            const otp =await TokenService.generateVerificationCode();
            const otpVal=await OtpRepository.createOTP(user.id,otp.token,otp.expires);
            await sendVerificationCode(user.email,otpVal.otp_code,user.id,otpVal.id);
            ResponseService.CreateSuccessResponse(
                201,
                "User created successfully! Check Your email for Verification",
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

    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await AuthRepository.getUserByEmail(email);
            if (!user) {
                ResponseService.CreateErrorResponse("User not found", 404);
            }
            const isPasswordValid = await UserService.comparePassword(
                password,
                user.password
            );
            if (!isPasswordValid) {
                ResponseService.CreateErrorResponse("Invalid Credentials", 401);
            }
            if(!user.is_verified){
                ResponseService.CreateErrorResponse("User is not verified! Check Your email", 403);
            }
            const token=await JwtService.sign(res, {userID:user.id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
            ResponseService.CreateSuccessResponse(
                200,
                "User logged in successfully",
                {
                    id: user.id,
                    email: user.email,
                    is_verified: user.is_verified,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                    token:token
                },
                res
            );
        } catch (error) {
            next(error);
        }
    }
}
