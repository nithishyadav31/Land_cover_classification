import requests
from config.settings import TILE_SERVER_URL
from utils.tile_utils import get_tile_path, tile_exists

def download_tile(z, x, y):
    """
    Given zoom, x, and y coordinates, constructs the URL, fetches the
    satellite image, and saves it locally.
    
    Returns the absolute path of the downloaded tile.
    """
    tile_path = get_tile_path(z, x, y)
    
    # Don't re-download if we already have it
    if tile_exists(z, x, y):
        return tile_path
        
    # Construct ArcGIS Map Server URL
    url = TILE_SERVER_URL.format(z=z, y=y, x=x)
    
    headers = {
        'User-Agent': 'LandCoverClassificationApp/1.0'
    }
    
    try:
        response = requests.get(url, headers=headers, stream=True)
        response.raise_for_status()
        
        with open(tile_path, 'wb') as f:
            for chunk in response.iter_content(chunk_size=8192):
                f.write(chunk)
                
        return tile_path
        
    except requests.exceptions.RequestException as e:
        print(f"Error downloading tile {z}/{x}/{y}: {str(e)}")
        # If it fails, return None
        return None
