import { Router } from "express";
import predictionRoutes from "./prediction/prediction";
import authRoutes from "./auth/auth.route";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

router.use("/prediction", authenticateToken, predictionRoutes);
router.use("/auth", authRoutes);

export default router;
