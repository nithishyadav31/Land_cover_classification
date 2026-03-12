import torch
import segmentation_models_pytorch as smp
import os
from config.settings import MODEL_PATH, DEVICE

# Global variable to cache the model in memory
_model_instance = None

def load_semantic_model():
    """
    Initializes a DeepLabV3 model architecture based on ResNet50,
    and loads learned weights from MODEL_PATH.
    
    Caches the loaded model to avoid re-loading from disk repeatedly.
    """
    global _model_instance
    
    if _model_instance is not None:
        return _model_instance
        
    print(f"Loading semantic segmentation model onto {DEVICE}...")
    
    # Instantiate the defined model architecture (DeepLabV3 + ResNet50)
    # Using the standard configuration given for 6 class segmentation
    model = smp.DeepLabV3(
        encoder_name="resnet50",
        encoder_weights=None, # Loading our own custom weights instead
        in_channels=3,
        classes=6
    )
    
    if os.path.exists(MODEL_PATH):
        try:
            # Load the custom trained model state dictionary
            state_dict = torch.load(MODEL_PATH, map_location=DEVICE)
            model.load_state_dict(state_dict)
            print("Model weights successfully loaded.")
        except Exception as e:
            print(f"FAILED to load model weights: {e}")
    else:
        print(f"CRITICAL: Model file NOT found at {MODEL_PATH}. Inference will produce unclassified results.")
        
    model.to(DEVICE)
    
    # Set model to evaluation mode (disables dropout, fixes batchnorm)
    model.eval()
    
    _model_instance = model
    return _model_instance
