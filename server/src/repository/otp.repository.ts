import OTP from "../models/otp";

export class OtpRepository {
    static async createOTP(
        user_id: number,
        otp_code: number,
        expires_at: Date
    ): Promise<OTP> {
        return OTP.create({
            user_id,
            otp_code,
            expires_at,
        });
    }
    static async verifyOTP(
        id: number,
        user_id: number,
        otp_code: number
    ): Promise<OTP | null> {
        return OTP.findOne({
            where: {
                id,
                user_id,
                otp_code,
                is_used: false,
            },
        });
    }
    static async updateOTP(id: number): Promise<OTP> {
        await OTP.update(
            { is_used: true },
            {
                where: {
                    id,
                },
            }
        );
        return OTP.findByPk(id);
    }
}
