import { JwtPayload } from "jsonwebtoken";

export interface IDecodedToken extends JwtPayload{
    userID:number;
}