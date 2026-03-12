from flask import Blueprint, request, jsonify
from services.inference_service import run_landscape_inference

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.route('/analyze', methods=['POST'])
def analyze():
    """
    Expects a JSON payload matching frontend request specs and map coordinates:
    {
      "latitude": float,
      "longitude": float,
      "zoom": int
    }
    """
    data = request.get_json()
    
    if not data:
         return jsonify({'error': 'No JSON payload provided'}), 400
         
    # Extract coordinates that match standard map usage
    # Fall defaults if not sent properly.
    lat = data.get('latitude', 0.0)
    lon = data.get('longitude', 0.0)
    zoom = data.get('zoom', 15)  # Default zoom level
    
    try:
        # Execute the primary ML classification pipeline logic
        statistics = run_landscape_inference(lat, lon, zoom)
        
        if 'error' in statistics:
             return jsonify({'error': statistics['error']}), 500
            
        print(f"Computed percentages for [Lat:{lat}, Lon:{lon}]: {statistics}")
        return jsonify(statistics), 200
        
    except Exception as e:
        print(f"Server Route Error: {str(e)}")
        return jsonify({'error': 'An internal server error occurred while processing map area.'}), 500
