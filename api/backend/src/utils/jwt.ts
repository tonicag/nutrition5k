// src/utils/jwt.ts
import jwt, { SignOptions } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export interface JWTPayload {
    userId: string;
    email: string;
}

export const generateToken = (payload: JWTPayload): string => {
    const options: SignOptions = {
        expiresIn: "7d",
        issuer: "nutrition-5k-gavris-dev",
    } as SignOptions;

    return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string): JWTPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as JWTPayload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};

export const generateRefreshToken = (payload: JWTPayload): string => {
    const options: SignOptions = {
        expiresIn: "30d",
        issuer: "nutrition-5k-gavris-dev",
    };

    return jwt.sign(payload, JWT_SECRET, options);
};
