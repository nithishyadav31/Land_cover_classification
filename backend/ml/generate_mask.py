import torch
from ml.model_loader import load_semantic_model

# Tunable OOD Thresholds
# For a 6-class model, max possible Shannon Entropy = ln(6) ≈ 1.79
# Setting ENTROPY_THRESHOLD too low (e.g. 1.50) incorrectly flags legitimate
# land pixels as Unclassified. Tuned thresholds below are much more selective.
CONFIDENCE_THRESHOLD = 0.25   # Only flag pixels with very low top probability
ENTROPY_THRESHOLD    = 1.72   # Only flag near-uniform distributions (OOD signal)
UNCLASSIFIED_ID      = 6      # Class ID assigned to uncertain pixels

def _compute_entropy(probs: torch.Tensor) -> torch.Tensor:
    """
    Calculates Shannon Entropy per pixel.

    **Why this improves reliability:**
    - Low confidence alone can miss cases where the model is "wrong but sure"
      (e.g. confidently predicts Forest on deep ocean due to dark-green algae tint).
    - Entropy captures the *spread* of probability mass across all classes.
    - A uniform distribution [0.17, 0.17, 0.17, 0.17, 0.16, 0.16] has BOTH
      low max-prob AND high entropy -- a much stronger OOD signal.

    Args:
        probs: Softmax probabilities, shape [B, C, H, W]
    Returns:
        entropy: shape [B, H, W]
    """
    eps = 1e-7  # Prevent log(0)
    return -torch.sum(probs * torch.log(probs + eps), dim=1)


def execute_model_inference(tensor_image: torch.Tensor) -> torch.Tensor:
    """
    Runs the segmentation model with dual-gate OOD detection
    (Confidence Threshold + Shannon Entropy Threshold).

    Returns a 2D mask [H, W] where uncertain pixels are labeled
    UNCLASSIFIED_ID (6) rather than a forced, incorrect class.
    """
    model = load_semantic_model()

    with torch.no_grad():
        # ── Step 1: Forward pass → Raw logits [1, C, H, W]
        logits = model(tensor_image)

        # ── Step 2: Convert to calibrated probabilities
        probs = torch.softmax(logits, dim=1)  # [1, C, H, W]

        # ── Step 3: Confidence gate — max class probability per pixel
        max_probs, mask = torch.max(probs, dim=1)  # both → [1, H, W]

        # ── Step 4: Entropy gate — Shannon uncertainty per pixel
        entropy = _compute_entropy(probs)           # [1, H, W]

        # ── Step 5: Combine gates
        # A pixel is marked OOD if EITHER gate fires
        ood_pixels = (max_probs < CONFIDENCE_THRESHOLD) | (entropy > ENTROPY_THRESHOLD)

        # ── Step 6: Apply OOD mask → override uncertain pixels
        mask[ood_pixels] = UNCLASSIFIED_ID

        # Extract from batch dimension
        final_mask = mask[0]  # [H, W]

    # Diagnostic summary
    total          = final_mask.numel()
    unclassified   = (final_mask == UNCLASSIFIED_ID).sum().item()
    pct_ood        = (unclassified / total) * 100
    print(f"[OOD Inference] {unclassified}/{total} pixels marked Unclassified ({pct_ood:.1f}%)")

    return final_mask

