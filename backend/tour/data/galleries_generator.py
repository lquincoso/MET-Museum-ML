import requests
import json
import os
import math

# Base URL for The MET API
BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1"

# Reference coordinates of the MET main entrance (Approximate)
MAIN_ENTRANCE_COORDINATES = [40.7794, -73.9632]

# Offset distances for galleries (in approximate latitude and longitude differences)
LAT_OFFSET = 0.00015
LON_OFFSET = 0.00015

# Sample gallery data with initial approximate coordinates
galleries_data = {
    "100": {"name": "Greek and Roman Art", "offsets": [1, -1], "artworks": []},
    "101": {"name": "Egyptian Art", "offsets": [1, -2], "artworks": []},
    "102": {"name": "Medieval Art", "offsets": [0, -1], "artworks": []},
    "103": {"name": "Arms and Armor", "offsets": [1, 0], "artworks": []},
    "104": {"name": "Modern and Contemporary Art", "offsets": [-1, -1], "artworks": []},
    "105": {"name": "American Wing", "offsets": [0, 1], "artworks": []},
    "106": {"name": "Asian Art", "offsets": [2, 1], "artworks": []},
    "107": {"name": "European Paintings 1250-1800", "offsets": [2, 0], "artworks": []},
    "108": {"name": "Musical Instruments", "offsets": [3, 1], "artworks": []},
    "109": {"name": "Exhibition Gallery 999", "offsets": [-1, 0], "artworks": []},
    "110": {"name": "Exhibition Gallery 899", "offsets": [-1, 1], "artworks": []},
    "111": {"name": "Grace Rainey Rogers Auditorium", "offsets": [1, -3], "artworks": []},
}

# Function to calculate coordinates based on offsets
def calculate_coordinates(base_coordinates, offsets, lat_offset, lon_offset):
    lat, lon = base_coordinates
    lat_offset_value, lon_offset_value = offsets
    return [
        lat + lat_offset_value * lat_offset,
        lon + lon_offset_value * lon_offset,
    ]

# Function to calculate Euclidean distance between two coordinate pairs
def calculate_distance(coord1, coord2):
    return math.sqrt((coord1[0] - coord2[0]) ** 2 + (coord1[1] - coord2[1]) ** 2)

# Function to get all object IDs from the MET API
def get_all_object_ids():
    response = requests.get(f"{BASE_URL}/objects")
    if response.status_code == 200:
        return response.json().get("objectIDs", [])
    return []

# Function to get object details by object ID
def get_object_details(object_id):
    response = requests.get(f"{BASE_URL}/objects/{object_id}")
    if response.status_code == 200:
        return response.json()
    return None

# Populate gallery data with coordinates
for gallery_id, gallery_data in galleries_data.items():
    # Calculate coordinates for each gallery
    gallery_data["coordinates"] = calculate_coordinates(
        MAIN_ENTRANCE_COORDINATES,
        gallery_data["offsets"],
        LAT_OFFSET,
        LON_OFFSET,
    )

# Calculate neighbors for each gallery
DISTANCE_THRESHOLD = 0.0003  # Threshold for defining a neighbor (tune this value as needed)

for gallery_id, gallery_info in galleries_data.items():
    gallery_info['neighbors'] = {}  # Initialize the neighbors field

    # Compare with all other galleries to determine neighbors
    for other_id, other_info in galleries_data.items():
        if gallery_id == other_id:
            continue

        distance = calculate_distance(gallery_info['coordinates'], other_info['coordinates'])
        if distance <= DISTANCE_THRESHOLD:
            gallery_info['neighbors'][other_id] = distance

# Retrieve all object IDs
object_ids = get_all_object_ids()

# Iterate over a subset of object IDs for testing (limit to avoid rate limits)
for object_id in object_ids[1000:1500]:  # Limiting to the first 500 for testing
    object_details = get_object_details(object_id)
    if object_details and "galleryNumber" in object_details:
        gallery_number = str(object_details["galleryNumber"])
        if gallery_number in galleries_data:
            galleries_data[gallery_number]["artworks"].append({
                "objectID": object_id,
                "title": object_details.get("title"),
                "artist": object_details.get("artistDisplayName"),
            })

# Save gallery data to galleries.json
output_path = os.path.join(os.path.dirname(__file__), 'galleries.json')
with open(output_path, 'w') as f:
    json.dump(galleries_data, f, indent=4)

print("galleries.json has been generated successfully at:", output_path)