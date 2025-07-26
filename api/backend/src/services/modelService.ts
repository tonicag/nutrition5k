import axios, { AxiosResponse } from "axios";
import FormData from "form-data";
import { MacronutrientPredictionResponse } from "../types/nutrition";

class ModelService {
    private readonly baseUrl: string;
    private readonly timeout: number;

    constructor() {
        this.baseUrl = process.env.MODEL_SERVICE_URL || "http://localhost:5000";
        this.timeout = parseInt(process.env.MODEL_SERVICE_TIMEOUT || "30000");
    }

    /**
     * Check if the model service is healthy
     */
    async healthCheck(): Promise<boolean> {
        try {
            const response = await axios.get(`${this.baseUrl}/health`, {
                timeout: 5000,
            });
            return (
                response.data.status === "healthy" && response.data.model_loaded
            );
        } catch (error) {
            console.error("Model service health check failed:", error);
            return false;
        }
    }

    /**
     * Convert base64 image to Buffer
     */
    private base64ToBuffer(base64Image: string): Buffer {
        const base64Data = base64Image.replace(
            /^data:image\/[a-z]+;base64,/,
            ""
        );
        return Buffer.from(base64Data, "base64");
    }

    /**
     * Detect image format from base64 string
     */
    private detectImageFormat(base64Image: string): string {
        if (
            base64Image.startsWith("data:image/jpeg") ||
            base64Image.startsWith("data:image/jpg")
        ) {
            return "jpg";
        } else if (base64Image.startsWith("data:image/png")) {
            return "png";
        } else if (base64Image.startsWith("data:image/gif")) {
            return "gif";
        } else if (base64Image.startsWith("data:image/bmp")) {
            return "bmp";
        } else if (base64Image.startsWith("data:image/tiff")) {
            return "tiff";
        }
        // Default to jpg if format can't be detected
        return "jpg";
    }

    /**
     * Predict macronutrients from base64 image
     */
    async predictNutrition(
        base64Image: string,
        mass?: number
    ): Promise<MacronutrientPredictionResponse> {
        try {
            const imageBuffer = this.base64ToBuffer(base64Image);
            const imageFormat = this.detectImageFormat(base64Image);

            const formData = new FormData();
            formData.append("image", imageBuffer, {
                filename: `image.${imageFormat}`,
                contentType: `image/${imageFormat}`,
            });

            if (mass !== undefined && mass > 0) {
                formData.append("mass", mass.toString());
            }

            const response: AxiosResponse<MacronutrientPredictionResponse> =
                await axios.post(`${this.baseUrl}/predict`, formData, {
                    headers: {
                        ...formData.getHeaders(),
                    },
                    timeout: this.timeout,
                    maxContentLength: Infinity,
                    maxBodyLength: Infinity,
                });

            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.error || error.message;
                throw new Error(`Model service error: ${message}`);
            }
            throw new Error(
                `Failed to predict nutrition: ${error instanceof Error ? error.message : "Unknown error"}`
            );
        }
    }
}

export default new ModelService();
