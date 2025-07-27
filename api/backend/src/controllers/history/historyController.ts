import { Request, Response } from "express";
import { prisma } from "../../services/db";

class HistoryController {
    async getHistory(req: Request, res: Response) {
        const user = req.user;

        if (!user) {
            res.status(200).json({
                success: true,
                data: [],
            });
            return;
        }

        const predictions = await prisma.prediction.findMany({
            where: {
                userId: user.userId,
            },
            take: 10,
            orderBy: { createdAt: "desc" },
        });

        res.status(200).json({
            success: true,
            data: predictions,
        });
    }
}

export default new HistoryController();
