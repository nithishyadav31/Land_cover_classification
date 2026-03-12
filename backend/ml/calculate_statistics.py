import numpy as np
from config.settings import CLASSES

def calculate_land_percentages(mask_tensor):
    """
    Given a PyTorch tensor mask [H, W] of class predictions:
    1. Count total pixels.
    2. Count pixels for each distinct class (0 through 5).
    3. Calculate percentage of each class.
    
    Returns a dictionary of percentages keyed by class name.
    """
    # Convert PyTorch tensor back to a 1D numpy array for easy counting
    mask = mask_tensor.cpu().numpy().flatten()
    
    # Count occurrences of each class ID in the mask
    # bincount handles non-negative integer arrays effectively
    counts = np.bincount(mask, minlength=len(CLASSES))
    
    # Calculate total pixels in the image
    total_pixels = len(mask)
    
    percentages = {}
    
    # Generate percentages for each class explicitly defined
    for class_id, count in enumerate(counts):
        if class_id in CLASSES:
            class_name = CLASSES[class_id]
            # Calculate the percentage, precision to 2 decimals
            pct = round((count / total_pixels) * 100, 2)
            percentages[class_name] = pct
            
    return percentages
