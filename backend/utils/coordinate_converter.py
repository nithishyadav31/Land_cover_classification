import math

def deg2num(lat_deg, lon_deg, zoom):
    """
    Convert geographic coordinates (latitude, longitude) to XYZ tile numbers.
    Based on OpenStreetMap Slippy Map mathematical formulas.
    """
    lat_rad = math.radians(lat_deg)
    n = 2.0 ** zoom
    xtile = int((lon_deg + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.asinh(math.tan(lat_rad)) / math.pi) / 2.0 * n)
    
    return xtile, ytile, zoom

def num2deg(xtile, ytile, zoom):
    """
    Convert XYZ tile numbers into geographic coordinates (latitude, longitude)
    pointing to the top-left corner of the tile.
    """
    n = 2.0 ** zoom
    lon_deg = xtile / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * ytile / n)))
    lat_deg = math.degrees(lat_rad)
    return lat_deg, lon_deg

def get_bounding_box(xtile, ytile, zoom):
    """
    Returns the bounding box (NW, SE) lat/lng coordinates for a given tile.
    """
    nw_lat, nw_lon = num2deg(xtile, ytile, zoom)
    se_lat, se_lon = num2deg(xtile + 1, ytile + 1, zoom)
    return {
        "nw": [nw_lat, nw_lon],
        "se": [se_lat, se_lon]
    }
