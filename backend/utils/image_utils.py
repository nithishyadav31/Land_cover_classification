import base64
from io import BytesIO
import numpy as np
from PIL import Image

# RGB Colors for each class (used for colored map overlays)
COLOR_MAP = {
    0: [220, 38, 38],    # Urban: Red
    1: [252, 211, 77],   # Agriculture: Yellow
    2: [163, 230, 53],   # Rangeland: Light Green
    3: [22, 163, 74],    # Forest: Green
    4: [37, 99, 235],    # Water: Blue
    5: [156, 163, 175],  # Barren: Gray
    6: [15, 23, 42],     # Unclassified/Ocean: Slate-900
}

# Pre-filter solid colors for fast OOD return payloads
SOLID_COLORS = {
    'ocean': [37, 99, 235, 180],    # Water Blue, semi-transparent
    'cloud': [200, 210, 220, 180],  # Light grey-blue, semi-transparent
}

def mask_to_base64_image(mask_tensor):
    """
    Converts a 2D class mask tensor into a Base64-encoded PNG image with colors.
    """
    mask_np = mask_tensor.cpu().numpy().astype(np.uint8)
    h, w = mask_np.shape
    
    rgba_img = np.zeros((h, w, 4), dtype=np.uint8)
    
    for class_id, color in COLOR_MAP.items():
        mask = (mask_np == class_id)
        rgba_img[mask, :3] = color
        rgba_img[mask, 3] = 180  # Semi-transparent overlay
        
    img = Image.fromarray(rgba_img, mode="RGBA")
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"


def make_solid_color_image(color_key: str, size: int = 256) -> str:
    """
    Generates a solid-color base64 PNG image for heuristically detected OOD tiles.
    Used to provide a visual overlay even when the model was bypassed.

    Args:
        color_key: Key from SOLID_COLORS dict (e.g. 'ocean', 'cloud')
        size: Output image dimension (default 256x256 to match tile size)
    Returns:
        Base64 encoded PNG data URI string.
    """
    rgba = SOLID_COLORS.get(color_key, [128, 128, 128, 180])
    img_array = np.full((size, size, 4), rgba, dtype=np.uint8)
    img = Image.fromarray(img_array, mode="RGBA")
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"

