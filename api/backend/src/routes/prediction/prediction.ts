import { Router } from "express";
import predictionController from "../../controllers/predictionController";

const router = Router();

/**
 * POST /api/prediction/macronutrients
 * Predict macronutrients from base64 image
 *
 * Body:
 * {
 *   "image": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...",
 * }
 */
router.post("/macronutrients", predictionController.predictMacronutrients);

/**
 * GET /api/prediction/health
 * Check if the prediction service is healthy
 */
router.get("/health", predictionController.healthCheck);

export default router;
