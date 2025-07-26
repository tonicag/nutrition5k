import { NextFunction, Request, Response } from "express";

const API_KEY = process.env.AUTH_API_KEY;

export default function apiKeyAuthenticator(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const apiKey = req.header("x-api-key");
    console.log(apiKey, API_KEY);
    if (apiKey !== API_KEY) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    next();
}
