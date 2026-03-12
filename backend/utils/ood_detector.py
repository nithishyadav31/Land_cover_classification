import cv2
import numpy as np

# ──────────────────────────────────────────────────────────
# Phase 1: Lightweight Heuristic Pre-Filter
# Checks image statistics BEFORE invoking the GPU/Model.
# Catches obvious ocean/cloud tiles in milliseconds.
# ──────────────────────────────────────────────────────────

# Thresholds (tuned for ArcGIS World Imagery satellite tiles)
VARIANCE_THRESHOLD    = 120.0  # Pixels: Low variance = featureless (ocean/cloud)
BLUE_DOMINANCE_RATIO  = 1.12   # Blue channel must be X% brighter than Red & Green
BRIGHTNESS_THRESHOLD  = 220    # Very bright tiles are likely clouds (RGB close to 255)

def is_ocean_or_cloud(image_path: str) -> tuple[bool, str]:
    """
    Reads a tile and applies fast heuristic checks to detect obvious
    ocean or cloud tiles without running the neural network.

    Returns:
        (True, 'Ocean')  — the tile is likely open ocean / water
        (True, 'Cloud')  — the tile is likely a cloud / noisy tile
        (False, None)    — the tile looks like land, proceed to inference
    """
    img_bgr = cv2.imread(image_path)
    if img_bgr is None:
        return False, None

    # Convert to RGB (ArcGIS imagery is RGB)
    img = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2RGB).astype(np.float32)

    # ---------- Check 1: Low Spatial Variance (Uniform Tile) ----------
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY).astype(np.float32)
    variance = float(np.var(gray))

    # ---------- Check 2: Blue Channel Dominance (Ocean Water) ----------
    mean_r = float(np.mean(img[:, :, 0]))
    mean_g = float(np.mean(img[:, :, 1]))
    mean_b = float(np.mean(img[:, :, 2]))

    # Combine low variance AND strong blue dominance → Ocean
    if (variance < VARIANCE_THRESHOLD and
            mean_b > mean_r * BLUE_DOMINANCE_RATIO and
            mean_b > mean_g * BLUE_DOMINANCE_RATIO):
        print(f"[OOD Pre-Filter] Ocean detected — var={variance:.1f}, "
              f"R={mean_r:.0f} G={mean_g:.0f} B={mean_b:.0f}")
        return True, 'Ocean'

    # ---------- Check 3: Very High Brightness (Cloud Coverage) ----------
    mean_brightness = float(np.mean(gray))
    if mean_brightness > BRIGHTNESS_THRESHOLD and variance < VARIANCE_THRESHOLD * 3:
        print(f"[OOD Pre-Filter] Cloud detected — brightness={mean_brightness:.1f}, var={variance:.1f}")
        return True, 'Cloud'

    return False, None
