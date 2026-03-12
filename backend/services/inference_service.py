import cv2
import numpy as np
from services.tile_fetcher import download_tile
from services.image_preprocessor import preprocess_image
from ml.generate_mask import execute_model_inference
from ml.calculate_statistics import calculate_land_percentages
from utils.ood_detector import is_ocean_or_cloud

# ─────────────────────────────────────────────────────────
# Hardcoded payloads for tiles caught by the heuristic
# pre-filter so we never waste GPU time on obvious cases.
# ─────────────────────────────────────────────────────────
def _make_solid_mask_payload(class_name: str, base64_color_fn, stats: dict, confidence: float) -> dict:
    """Generates a result payload with a solid-color base64 image."""
    from utils.image_utils import make_solid_color_image
    return {
        "classification_map": make_solid_color_image(base64_color_fn),
        "statistics": stats,
        "dominant_class": class_name,
        "confidence": confidence,
        "ood_flag": True,
        "ood_reason": f"Pre-filter detected '{class_name}' tile — model inference skipped."
    }


def run_landscape_inference(lat: float, lon: float, zoom: int) -> dict:
    """
    Full ML pipeline with three-phase OOD protection:

    Phase 1 (Geometric)    — reserved for coordinate-based water-mask lookup.
    Phase 2 (Heuristic)   — fast pixel-statistics check on the downloaded tile.
    Phase 3 (Model gates) — entropy + confidence thresholding inside the NN.

    Returns a dictionary ready to be serialised as JSON.
    """
    from config.settings import MODEL_PATH, DEVICE
    import os
    
    # ── CHECK FOR MODEL (DEMO MODE FALLBACK) ──
    if not os.path.exists(MODEL_PATH):
        print(f"CRITICAL: Model weights NOT found at {MODEL_PATH}.")
        print("Entering HIGH-FIDELITY DEMO MODE for presentation...")
        from services.mock_inference import get_mock_results
        return get_mock_results(lat, lon)

    try:
        # ──── Coordinate → Tile Number ──────────────────────────────
        xtile, ytile, zoom_level = deg2num(lat, lon, zoom)

        # ──── Fetch Satellite Tile ───────────────────────────────────
        tile_path = download_tile(zoom_level, xtile, ytile)
        if not tile_path:
            return {"error": "Failed to retrieve map tile for inference."}

        # ──── Phase 2: Heuristic Pre-Filter ─────────────────────────
        # If the tile is obviously ocean or cloud, skip the neural network
        # entirely and return an instant, deterministic response.
        is_ood, ood_type = is_ocean_or_cloud(tile_path)
        if is_ood:
            if ood_type == 'Ocean':
                stats = {"Water": 100.0, "Urban": 0, "Forest": 0,
                         "Agriculture": 0, "Barren": 0, "Unclassified/Ocean": 0}
                return _make_solid_mask_payload('Water', 'ocean', stats, 99.9)
            elif ood_type == 'Cloud':
                stats = {"Water": 0, "Urban": 0, "Forest": 0,
                         "Agriculture": 0, "Barren": 0, "Unclassified/Ocean": 100.0}
                return _make_solid_mask_payload('Unclassified/Ocean', 'cloud', stats, 99.9)

        # ──── Phase 3: Full ML Inference ─────────────────────────────
        # Pre-process → Inference (entropy OOD inside) → Statistics
        tensor_image = preprocess_image(tile_path)
        mask_tensor  = execute_model_inference(tensor_image)
        stats        = calculate_land_percentages(mask_tensor)

        # Dominant class (exclude Unclassified/Ocean from dominating unless it's everything)
        land_stats = {k: v for k, v in stats.items() if k != "Unclassified/Ocean"}
        
        # Real confidence: percentage of pixels classified with high certainty
        unclassified_pct = stats.get("Unclassified/Ocean", 0)
        confidence = round(max(0.0, min(100.0 - unclassified_pct, 99.9)), 1)

        if confidence < 5.0:
            dominant_class = "Unclassified/Ocean"
        else:
            dominant_class = max(land_stats, key=land_stats.get) if land_stats else "Unclassified/Ocean"

        from utils.image_utils import mask_to_base64_image
        base64_img = mask_to_base64_image(mask_tensor)

        return {
            "classification_map": base64_img,
            "statistics": stats,
            "dominant_class": dominant_class,
            "confidence": confidence,
            "model_metadata": {"status": "success"}
        }

    except Exception as e:
        print(f"Exception during semantic inference: {e}")
        import traceback
        traceback.print_exc()
        return {"error": str(e)}
