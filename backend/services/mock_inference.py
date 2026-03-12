import numpy as np
import cv2
import base64
import random

def get_mock_results(lat, lon):
    """
    Generates deterministic but realistic-looking land cover statistics 
    and a colorful classification map based on coordinates.
    """
    # Use coordinates as seed for consistency
    seed = int((abs(lat) * 1000 + abs(lon) * 1000) % 1000000)
    random.seed(seed)
    np.random.seed(seed)

    # Define classes and realistic ranges
    classes = ["Forest", "Urban", "Water", "Agriculture", "Barren"]
    
    # Generate random weights that sum to ~100
    weights = [random.uniform(5, 40) for _ in classes]
    total = sum(weights)
    stats = {c: round((w / total) * 95, 1) for c, w in zip(classes, weights)}
    stats["Unclassified/Ocean"] = round(100.0 - sum(stats.values()), 1)

    # Determine dominant class
    land_stats = {k: v for k, v in stats.items() if k != "Unclassified/Ocean"}
    dominant_class = max(land_stats, key=land_stats.get)
    confidence = round(random.uniform(82.4, 98.7), 1)

    # Create a "smart" colorful mask (512x512)
    # 0=Forest, 1=Urban, 2=Water, 3=Agriculture, 4=Barren, 5=Rangeland(unused), 6=Unclassified
    mask = np.zeros((512, 512), dtype=np.uint8)
    
    # Simple Voronoi-like noise for realistic patches
    points = []
    for _ in range(15):
        points.append((random.randint(0, 511), random.randint(0, 511), random.randint(0, 4)))
    
    for y in range(0, 512, 8):
        for x in range(0, 512, 8):
            # Find nearest point
            dists = [((x-px)**2 + (y-py)**2) for px, py, c in points]
            nearest_idx = np.argmin(dists)
            mask[y:y+8, x:x+8] = points[nearest_idx][2]

    # Convert mask to colorful base64 image
    # Color mapping (matching frontend colors)
    color_map = {
        0: [34, 197, 94],   # Forest (Emerald)
        1: [244, 63, 94],   # Urban (Rose)
        2: [59, 130, 246],  # Water (Blue)
        3: [245, 158, 11],  # Agriculture (Amber)
        4: [148, 163, 184], # Barren (Slate)
        6: [15, 23, 42]     # Unclassified (Space)
    }

    colored_mask = np.zeros((512, 512, 3), dtype=np.uint8)
    for cid, color in color_map.items():
        colored_mask[mask == cid] = color[::-1] # BGR for OpenCV

    _, buffer = cv2.imencode('.png', colored_mask)
    base64_img = f"data:image/png;base64,{base64.b64encode(buffer).decode('utf-8')}"

    return {
        "classification_map": base64_img,
        "statistics": stats,
        "dominant_class": dominant_class,
        "confidence": confidence,
        "model_metadata": {
            "status": "demo_mode",
            "message": "Real model missing. Running in high-fidelity simulation mode."
        }
    }
