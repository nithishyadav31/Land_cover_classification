import cv2
import torch
import numpy as np
from config.settings import IMAGE_SIZE, DEVICE

def preprocess_image(image_path):
    """
    Reads an image from disk, converts to RGB, resizes, normalizes to [0,1],
    and converts to a PyTorch tensor.
    
    Returns the tensor ready for model inference with shape [1, C, H, W]
    """
    # Read the image using OpenCV (loads as BGR)
    image = cv2.imread(image_path)
    if image is None:
        raise ValueError(f"Could not load image at path {image_path}")
        
    # Convert BGR to RGB
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Resize the image to the standard model input size (default 256x256)
    image = cv2.resize(image, (IMAGE_SIZE, IMAGE_SIZE))
    
    # Normalize pixel values from 0-255 to 0.0-1.0
    image = image / 255.0
    
    # Convert to PyTorch tensor. OpenCV loads as [H, W, C].
    # PyTorch wants [C, H, W]. So we use permute(2,0,1).
    tensor_image = torch.tensor(image).permute(2, 0, 1).float()
    
    # Add a batch dimension -> [1, C, H, W]
    tensor_image = tensor_image.unsqueeze(0)
    
    # Move to desired device (CPU or GPU)
    tensor_image = tensor_image.to(DEVICE)
    
    return tensor_image
