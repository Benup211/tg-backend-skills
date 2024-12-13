import jwt from 'jsonwebtoken';
import { Response } from 'express';
export class JwtService {
    // This method is used to sign a token and set it as a cookie in the response object with validity of 7 days.
    static async sign(res: Response, payload: any, secret: string, options: any): Promise<string> {
        const token = jwt.sign(payload, secret, options);
        res.cookie("Token", token, {
            secure: true,
            httpOnly: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return token;
    }
    // This method is used to verify a token.
    static async verify(token: string, secret: string): Promise<any> {
        return jwt.verify(token, secret);
    }
}