from flask import Blueprint, jsonify, request
import json
import os
from .pathfinding import astar

tour_blueprint = Blueprint("tour", __name__)

# Loading gallery data
current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, 'data', 'galleries.json')

with open(json_path, 'r') as f:
    GALLERY_DATA = json.load(f)

@tour_blueprint.route('/galleries', methods=['GET'])
def get_galleries():
    """
    Endpoint to fetch gallery data.
    """
    return jsonify(GALLERY_DATA)

@tour_blueprint.route('/shortest-path', methods=['GET'])
def get_shortest_path():
    """
    Endpoint to find the shortest path between two galleries.
    """
    start = request.args.get('start')
    end = request.args.get('end')

    if not start or not end:
        return jsonify({"error": "Start and end gallery IDs are required"}), 400

    if start in GALLERY_DATA and end in GALLERY_DATA:
        path = astar(GALLERY_DATA, start, end)
        return jsonify({"path": path})
    else:
        return jsonify({"error": "Invalid start or end point"}), 400
