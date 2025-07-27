import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.middleware";
import authRoutes from "./auth/auth.route";
import historyRoutes from "./history/history";
import predictionRoutes from "./prediction/prediction";

const router = Router();

router.use("/auth", authRoutes);
router.use("/prediction", authenticateToken, predictionRoutes);
router.use("/history", authenticateToken, historyRoutes);

export default router;
