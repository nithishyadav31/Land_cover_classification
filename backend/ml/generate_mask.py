import base64
from io import BytesIO
from PIL import Image
import numpy as np

def generate_classification_mask(size=(256, 256)):
    """
    Generates a simulated classification mask and returns it as a Base64 string.
    In a real scenario, this would take the output of the MCNN model.
    """
    # Create a random mask for simulation
    # Classes: 0: Water, 1: Urban, 2: Forest, 3: Agriculture, 4: Barren
    mask_data = np.random.randint(0, 5, size=size, dtype=np.uint8)
    
    # Define colors (RGB) - Consistent with UI
    colors = {
        0: (59, 130, 246),  # Water (Blue-500)
        1: (244, 63, 94),   # Urban (Rose-500)
        2: (5, 150, 105),   # Forest (Emerald-600)
        3: (245, 158, 11),  # Agriculture (Amber-500)
        4: (148, 163, 184)  # Barren (Slate-400)
    }
    
    # Create RGB image from mask
    rgb_image = np.zeros((*size, 3), dtype=np.uint8)
    for class_id, color in colors.items():
        rgb_image[mask_data == class_id] = color
        
    img = Image.fromarray(rgb_image)
    
    # Convert to Base64
    buffered = BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    
    return f"data:image/png;base64,{img_str}"
