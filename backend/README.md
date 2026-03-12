# Land Cover Classification Backend

This is the Python Flask backend for the satellite map semantic segmentation project. It handles coordinate processing, downloading map tiles, and running them through a PyTorch ML model to categorize land coverage.

## Setup

1. Make sure you are in the `backend/` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the development server (Defaults to Port 5000):
   ```bash
   python app.py
   ```

## ML Model

The API expects a compiled PyTorch weights file for DeepLabV3 (ResNet50 based) to be placed at `models/landcover_model.pth`.

If the file is not found, the service will load standard randomized parameters (for UI testing/error checking).

## Core Architecture

- `config/settings.py`: Global system variables for Paths, Tiles, and Class dicts.
- `utils/`: Re-usable math (`coordinate_converter.py`) and file management logic (`tile_utils.py`).
- `services/`: Operations layer fetching images (`tile_fetcher.py`), image standardization (`image_preprocessor.py`), and the core pipeline glue (`inference_service.py`).
- `ml/`: Pytorch logic. Loads the DeepLab inference model, generates mask matrices over the map tiles, and aggregates those pixels into class percentage hashes.
- `routes/analyze.py`: HTTP handler linking `POST /api/analyze` input directly to the inference service.
