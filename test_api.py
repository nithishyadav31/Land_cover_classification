import requests
import json

url = "http://127.0.0.1:5000/api/analyze"
payload = {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "zoom": 15
}

try:
    response = requests.post(url, json=payload)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print("Statistics:", json.dumps(data.get("statistics"), indent=2))
        print("Dominant Class:", data.get("dominant_class"))
        print("Confidence:", data.get("confidence"))
        if "classification_map" in data:
            print("Classification Map (base64) received.")
    else:
        print("Error Response:", response.text)
except Exception as e:
    print(f"Request failed: {e}")
