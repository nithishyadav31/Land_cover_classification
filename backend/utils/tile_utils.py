import os
from config.settings import TILES_DIR

def get_tile_path(z, x, y):
    """
    Constructs the absolute file path where the tile will be stored locally.
    """
    if not os.path.exists(TILES_DIR):
        os.makedirs(TILES_DIR)
        
    filename = f"tile_{z}_{x}_{y}.jpg"
    return os.path.join(TILES_DIR, filename)

def tile_exists(z, x, y):
    """
    Checks if a tile has already been downloaded.
    """
    filepath = get_tile_path(z, x, y)
    return os.path.exists(filepath) and os.path.getsize(filepath) > 0

def clear_tile_cache():
    """
    Deletes all temporarily stored tiles to free up space.
    """
    if os.path.exists(TILES_DIR):
        for filename in os.listdir(TILES_DIR):
            filepath = os.path.join(TILES_DIR, filename)
            try:
                if os.path.isfile(filepath):
                    os.unlink(filepath)
            except Exception as e:
                print(f"Failed to delete {filepath}. Reason: {e}")
