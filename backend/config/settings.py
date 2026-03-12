import os

# Base directory
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ML Model settings
MODEL_PATH = os.path.join(BASE_DIR, "models", "landcover_model.pth")
IMAGE_SIZE = 256
DEVICE = "cpu"  # Change to "cuda" if GPU is available and required

# Tile Server Settings
# ArcGIS World Imagery provides high-quality satellite tiles globally
TILE_SERVER_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"

# Directory to temporarily store fetched tiles
TILES_DIR = os.path.join(BASE_DIR, "tiles")

# Land cover classification classes
CLASSES = {
    0: "Urban",
    1: "Agriculture",
    2: "Rangeland",
    3: "Forest",
    4: "Water",
    5: "Barren",
    6: "Unclassified/Ocean",
}
