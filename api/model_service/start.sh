#!/bin/bash

source .venv/bin/activate

gunicorn nutrition_api:app --bind 127.0.0.1:5000 --workers 1 --timeout 30