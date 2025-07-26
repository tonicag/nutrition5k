import { Request, Response } from "express";
import modelService from "../services/modelService";
import {
    macronutrientPredictionSchema,
    validateRequest,
    MacronutrientPredictionRequest,
} from "../validators/nutritionValidator";
import {
    MacronutrientPredictionResponse,
    ApiResponse,
} from "../types/nutrition";

export class PredictionController {
    /**
     * Predict macronutrients from base64 image
     */
    async predictMacronutrients(req: Request, res: Response): Promise<void> {
        try {
            const validator = validateRequest(macronutrientPredictionSchema);
            const validationResult = validator(req.body);

            if (!validationResult.success) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: validationResult.error,
                };
                res.status(400).json(response);
                return;
            }

            const { image, mass } =
                validationResult.data as MacronutrientPredictionRequest;

            const isHealthy = await modelService.healthCheck();
            if (!isHealthy) {
                const response: ApiResponse<null> = {
                    success: false,
                    error: "Model service is not available",
                };
                res.status(503).json(response);
                return;
            }

            const predictionResult: MacronutrientPredictionResponse =
                await modelService.predictNutrition(image, mass);

            delete predictionResult.metadata.filename;

            const response: ApiResponse<MacronutrientPredictionResponse> = {
                success: true,
                data: predictionResult,
            };

            res.status(200).json(response);
        } catch (error) {
            console.error("Prediction error:", error);

            const response: ApiResponse<null> = {
                success: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Internal server error",
            };

            res.status(500).json(response);
        }
    }

    /**
     * Health check for the prediction service
     */
    async healthCheck(req: Request, res: Response): Promise<void> {
        try {
            const isHealthy = await modelService.healthCheck();

            res.status(isHealthy ? 200 : 503).json({
                success: isHealthy,
                message: isHealthy
                    ? "Service is healthy"
                    : "Model service is not available",
                timestamp: new Date().toISOString(),
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: "Failed to check service health",
                timestamp: new Date().toISOString(),
            });
        }
    }
}

export default new PredictionController();
