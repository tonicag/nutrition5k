#!/usr/bin/env python3
"""
Model inference script for macronutrient prediction
This script loads the trained PyTorch model and provides inference capabilities
"""

import torch
import torch.nn as nn
import timm
import numpy as np
from PIL import Image
import pickle
import json
import sys
import os
from torchvision import transforms
import argparse


class MacronutrientPredictor(nn.Module):
    def __init__(self, model_variant='resnet101', freeze_backbone=False, freeze_stages=None):
        super(MacronutrientPredictor, self).__init__()
        self.model_variant = model_variant
        self.freeze_backbone = freeze_backbone
        self.freeze_stages = freeze_stages

        self.backbone = timm.create_model(
            model_variant,
            pretrained=True,
            num_classes=0,
            global_pool='avg'
        )

        self.feature_dim = 4096

        self.shared_features = nn.Sequential(
            nn.Linear(self.backbone.num_features, 4096),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(4096, 4096),
            nn.ReLU(),
            nn.Dropout(0.5)
        )

        self.fat_head = self.create_macronutrient_head(self.feature_dim)
        self.carbs_head = self.create_macronutrient_head(self.feature_dim)
        self.protein_head = self.create_macronutrient_head(self.feature_dim)

        self._init_heads()

    def create_macronutrient_head(self, input_dim):
        return nn.Sequential(
            nn.Linear(input_dim, 4096),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(4096, 1)
        )

    def _init_heads(self):
        for head in [self.fat_head, self.carbs_head, self.protein_head]:
            for layer in head:
                if isinstance(layer, nn.Linear):
                    nn.init.normal_(layer.weight, std=0.01)
                    nn.init.constant_(layer.bias, 0)

    def forward(self, x):
        backbone_features = self.backbone(x)
        shared_features = self.shared_features(backbone_features)

        fat = self.fat_head(shared_features)
        carbs = self.carbs_head(shared_features)
        protein = self.protein_head(shared_features)

        predictions = torch.cat([fat, carbs, protein], dim=1)
        return predictions


class NutritionPredictor:
    def __init__(self, model_path, device='cpu'):
        """
        Initialize the nutrition predictor

        Args:
            model_path (str): Path to the saved model checkpoint
            device (str): Device to run inference on ('cpu' or 'cuda')
        """
        device = device.lower()
        self.device = torch.device(
            device if torch.cuda.is_available() else 'cpu')

        # Load checkpoint
        checkpoint = torch.load(
            model_path, map_location=self.device, weights_only=False)

        # Initialize model
        model_variant = checkpoint.get('model_variant', 'resnet101')
        self.model = MacronutrientPredictor(model_variant=model_variant)
        self.model.load_state_dict(checkpoint['state_dict'])
        self.model.to(self.device)
        self.model.eval()

        # Load scalers
        self.fat_scaler = checkpoint['fat_scaler']
        self.carbs_scaler = checkpoint['carbs_scaler']
        self.protein_scaler = checkpoint['protein_scaler']

        # Define transforms
        self.transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                 std=[0.229, 0.224, 0.225])
        ])

    def preprocess_image(self, image_path):
        """
        Preprocess image for model input

        Args:
            image_path (str): Path to the image file

        Returns:
            torch.Tensor: Preprocessed image tensor
        """
        try:
            image = Image.open(image_path).convert('RGB')
            image_tensor = self.transform(image).unsqueeze(0)
            return image_tensor.to(self.device)
        except Exception as e:
            raise ValueError(f"Error processing image: {str(e)}")

    def predict(self, image_path, total_mass_grams=None):
        """
        Predict macronutrients from an image

        Args:
            image_path (str): Path to the image file
            total_mass_grams (float, optional): Total mass of the dish in grams

        Returns:
            dict: Prediction results
        """
        try:
            # Preprocess image
            image_tensor = self.preprocess_image(image_path)

            # Make prediction
            with torch.no_grad():
                predictions = self.model(image_tensor)

            # Extract scaled predictions
            pred_fat_scaled = predictions[0, 0].item()
            pred_carbs_scaled = predictions[0, 1].item()
            pred_protein_scaled = predictions[0, 2].item()

            # Inverse transform to get per-gram values
            pred_fat_per_gram = self.fat_scaler.inverse_transform([[pred_fat_scaled]])[
                0][0]
            pred_carbs_per_gram = self.carbs_scaler.inverse_transform(
                [[pred_carbs_scaled]])[0][0]
            pred_protein_per_gram = self.protein_scaler.inverse_transform(
                [[pred_protein_scaled]])[0][0]

            # Ensure non-negative values
            pred_fat_per_gram = max(0, pred_fat_per_gram)
            pred_carbs_per_gram = max(0, pred_carbs_per_gram)
            pred_protein_per_gram = max(0, pred_protein_per_gram)

            result = {
                'macronutrients_per_gram': {
                    'fat': round(pred_fat_per_gram, 4),
                    'carbs': round(pred_carbs_per_gram, 4),
                    'protein': round(pred_protein_per_gram, 4)
                }
            }

            # If total mass is provided, calculate total amounts and calories
            if total_mass_grams is not None:
                total_fat = pred_fat_per_gram * total_mass_grams
                total_carbs = pred_carbs_per_gram * total_mass_grams
                total_protein = pred_protein_per_gram * total_mass_grams
                total_calories = 9 * total_fat + 4 * total_carbs + 4 * total_protein

                result['total_mass_grams'] = total_mass_grams
                result['total_macronutrients'] = {
                    'fat_grams': round(total_fat, 2),
                    'carbs_grams': round(total_carbs, 2),
                    'protein_grams': round(total_protein, 2)
                }
                result['total_calories'] = round(total_calories, 2)

            return result

        except Exception as e:
            raise Exception(f"Prediction failed: {str(e)}")


def main():
    parser = argparse.ArgumentParser(
        description='Nutrition prediction from food images')
    parser.add_argument('--model_path', required=True,
                        help='Path to the model checkpoint')
    parser.add_argument('--image_path', required=True,
                        help='Path to the input image')
    parser.add_argument('--mass', type=float,
                        help='Total mass of the dish in grams')
    parser.add_argument('--device', default='cpu',
                        choices=['cpu', 'cuda'], help='Device to use')

    args = parser.parse_args()

    try:
        # Initialize predictor
        predictor = NutritionPredictor(args.model_path, args.device)

        # Make prediction
        result = predictor.predict(args.image_path, args.mass)

        # Output result as JSON
        print(json.dumps(result, indent=2))

    except Exception as e:
        error_result = {'error': str(e)}
        print(json.dumps(error_result, indent=2))
        sys.exit(1)


if __name__ == '__main__':
    main()
