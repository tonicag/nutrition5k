import { Router } from "express";
import predictionRoutes from "./prediction/prediction";

const router = Router();

router.use("/prediction", predictionRoutes);

export default router;
