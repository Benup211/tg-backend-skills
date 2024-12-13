//Generate 6 digit code and 10 min expiry time
export class TokenService{
    static async generateVerificationCode(): Promise<{ token: number, expires: Date }>{
        return {
            token: Math.floor(100000 + Math.random() * 900000),
            expires: new Date(Date.now() + 10 * 60 * 1000)
        }
    }
}