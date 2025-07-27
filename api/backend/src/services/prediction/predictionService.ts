import { prisma } from "../db";

type PredictionInput = {
    userId: string;
    image: string;
    macronutrients_per_gram: any;
    metadata: any;
};

class PredictionService {
    async savePrediction(prediction: PredictionInput) {
        const savedPrediction = await prisma.prediction.create({
            data: {
                userId: prediction.userId,
                image: prediction.image,
                macronutrients_per_gram:
                    prediction.macronutrients_per_gram as any,
                metadata: prediction.metadata as any,
            },
        });
        return savedPrediction;
    }
}

export default new PredictionService();
