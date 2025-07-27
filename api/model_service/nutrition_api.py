#!/usr/bin/env python3
"""
Flask API for macronutrient prediction
Run this as a separate service that your Express.js app can call
"""

import logging
import os
import tempfile
import uuid

from dotenv import load_dotenv
from flask import Flask, jsonify, request
from flask_cors import CORS
from model_inference import NutritionPredictor
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

MODEL_PATH = os.environ.get(
    'MODEL_PATH', './model_epoch_15_20250609_144020.pth')
DEVICE = os.environ.get('DEVICE', 'cpu')
UPLOAD_FOLDER = tempfile.gettempdir()
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg',
                      'gif', 'bmp', 'tiff', 'heic', 'heif'}

predictor = None


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def init_model():
    """Initialize the model predictor"""
    global predictor
    try:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Model file not found: {MODEL_PATH}")

        predictor = NutritionPredictor(MODEL_PATH, DEVICE)
        logger.info(f"Model loaded successfully from {MODEL_PATH}")
        logger.info(f"Using device: {DEVICE}")

    except Exception as e:
        logger.error(f"Failed to load model: {str(e)}")
        raise


@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': predictor is not None,
        'device': DEVICE
    })


@app.route('/predict', methods=['POST'])
def predict_nutrition():
    """
    Predict macronutrients from uploaded image

    Expected form data:
    - image: Image file (required)
    - mass: Total mass in grams (optional)
    """
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image file provided'}), 400

        file = request.files['image']

        if file.filename == '':
            return jsonify({'error': 'No image file selected'}), 400

        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file type. Allowed: ' + ', '.join(ALLOWED_EXTENSIONS)}), 400

        mass = request.form.get('mass')
        if mass:
            try:
                mass = float(mass)
                if mass <= 0:
                    return jsonify({'error': 'Mass must be positive'}), 400
            except ValueError:
                return jsonify({'error': 'Invalid mass value'}), 400

        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        temp_path = os.path.join(UPLOAD_FOLDER, unique_filename)

        try:
            file.save(temp_path)

            result = predictor.predict(temp_path, mass)

            result['metadata'] = {
                'filename': filename,
                'device_used': DEVICE,
                'mass_provided': mass is not None
            }

            return jsonify(result)

        finally:
            if os.path.exists(temp_path):
                os.remove(temp_path)

    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.route('/predict_from_url', methods=['POST'])
def predict_from_url():
    """
    Predict macronutrients from image URL

    Expected JSON:
    {
        "image_url": "https://example.com/image.jpg",
        "mass": 250.0  // optional
    }
    """
    try:
        data = request.get_json()

        if not data or 'image_url' not in data:
            return jsonify({'error': 'No image_url provided'}), 400

        image_url = data['image_url']

        from urllib.parse import urlparse

        import requests

        try:
            response = requests.get(image_url, timeout=30)
            response.raise_for_status()

            parsed_url = urlparse(image_url)
            filename = os.path.basename(parsed_url.path) or 'image.jpg'

            unique_filename = f"{uuid.uuid4()}_{filename}"
            temp_path = os.path.join(UPLOAD_FOLDER, unique_filename)

            with open(temp_path, 'wb') as f:
                f.write(response.content)

            result = predictor.predict(temp_path)

            result['metadata'] = {
                'image_url': image_url,
                'device_used': DEVICE,
            }

            return jsonify(result)

        except requests.RequestException as e:
            return jsonify({'error': f'Failed to download image: {str(e)}'}), 400

        finally:
            if 'temp_path' in locals() and os.path.exists(temp_path):
                os.remove(temp_path)

    except Exception as e:
        logger.error(f"URL prediction error: {str(e)}")
        return jsonify({'error': str(e)}), 500


@app.errorhandler(413)
def too_large(e):
    return jsonify({'error': 'File too large'}), 413


@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(e):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    init_model()

    port = int(os.environ.get('PORT', 5000))
    debug = os.environ.get('DEBUG', 'False').lower() == 'true'

    logger.info(f"Starting Flask API on port {port}")
    logger.info(f"Debug mode: {debug}")

    app.run(host='0.0.0.0', port=port, debug=debug)
