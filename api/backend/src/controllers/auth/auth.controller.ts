import { User } from "@prisma/client";
import { Request, Response } from "express";
import { prisma } from "../../services/db";
import { ApiResponse } from "../../types/nutrition";
import { validateRequest } from "../../validators/nutritionValidator";
import { registerValidator } from "./validators/register.validator";
import { comparePassword, hashPassword } from "./helpers/bcrypt";
import { loginValidator } from "./validators/login.validator";
import { generateToken } from "../../utils/jwt";

class AuthController {
    async register(req: Request, res: Response) {
        const validator = validateRequest(registerValidator);
        const validationResult = validator(req.body);

        if (!validationResult.success) {
            const response: ApiResponse<null> = {
                success: false,
                error: validationResult.error,
            };
            res.status(400).json(response);
            return;
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: validationResult.data.email },
        });

        if (existingUser) {
            const response: ApiResponse<null> = {
                success: false,
                error: "User already exists",
            };
            res.status(400).json(response);
            return;
        }

        const { email, password } = validationResult.data;

        const hashedPassword = await hashPassword(password);

        const user = await prisma.user.create({
            data: { email, password: hashedPassword },
        });

        const response: ApiResponse<User> = {
            success: true,
            data: user,
        };

        res.status(201).json(response);
    }

    async login(req: Request, res: Response) {
        const validator = validateRequest(loginValidator);
        const validationResult = validator(req.body);

        if (!validationResult.success) {
            const response: ApiResponse<null> = {
                success: false,
                error: validationResult.error,
            };
            res.status(403).json(response);
            return;
        }

        const { email, password } = validationResult.data;

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            const response: ApiResponse<null> = {
                success: false,
                error: "Invalid credentials",
            };
            res.status(403).json(response);
            return;
        }

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) {
            const response: ApiResponse<null> = {
                success: false,
                error: "Invalid credentials",
            };
            res.status(403).json(response);
            return;
        }

        const token = generateToken({ userId: user.id, email: user.email });
        const response: ApiResponse<{ token: string; email: string }> = {
            success: true,
            data: { token, email: user.email },
        };
        res.status(200).json(response);
    }
}

export default new AuthController();
