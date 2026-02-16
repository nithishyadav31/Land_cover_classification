from flask import Blueprint, request, jsonify
from ml.generate_mask import generate_classification_mask
from ml.calculate_statistics import calculate_land_cover_stats

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.route('/analyze', methods=['POST'])
def analyze_area():
    data = request.json
    lat = data.get('latitude')
    lng = data.get('longitude')
    
    if not lat or not lng:
        return jsonify({"error": "Latitude and Longitude are required"}), 400
    
    print(f"Analyzing area at: Lat {lat}, Lon {lng}")
    
    # ML Pipeline Execution
    # 1. Generate classification mask (Base64)
    mask_base64 = generate_classification_mask(size=(256, 256))
    
    # 2. Calculate statistics
    analysis_data = calculate_land_cover_stats()
    
    return jsonify({
        "status": "success",
        "coordinates": {"lat": lat, "lng": lng},
        "classification_map": mask_base64,
        "statistics": analysis_data["stats"],
        "dominant_class": analysis_data["dominant_class"],
        "confidence": analysis_data["confidence"]
    })
