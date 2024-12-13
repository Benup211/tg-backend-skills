import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
import { VERIFICATION_CODE_TEMPLATE } from "./email.template";


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
    },
});

export const sendVerificationCode = async (to: string, code: number, user_id:number,otp_id:number) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Verify your email",
            html: VERIFICATION_CODE_TEMPLATE
                .replace("{Verification_code}", code.toString())
                .replace("{Verification_link}", `${process.env.CLIENT_URL}/verify-email?user_id=${user_id}&otp_id=${otp_id}`),
        });
    } catch (error) {
        let errorStatus = (error as any).errorStatus || 500;
        let errorMessage = error.message || "Sending Verification code failed! Contact the support team.";
        throw {
            status: errorStatus,
            name: error.name,
            message: errorMessage,
        };
    }
}