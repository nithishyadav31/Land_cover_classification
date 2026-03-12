from flask import Flask
from flask_cors import CORS
import sys
import os

# Ensure the backend directory is in the sys.path so our submodules can be imported
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from routes.analyze import analyze_bp

def create_app():
    app = Flask(__name__)
    CORS(app) # Enable CORS for all routes
    
    # Register Blueprints
    app.register_blueprint(analyze_bp, url_prefix='/api')
    
    return app

if __name__ == '__main__':
    app = create_app()
    print("MCNN Analysis Engine starting on port 5000...")
    app.run(debug=False, port=5000)
