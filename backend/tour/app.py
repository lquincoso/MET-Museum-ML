from flask import Flask, request, jsonify
from flask_cors import CORS
import json

import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from pathfinding import astar

app = Flask(__name__)
CORS(app)

# Load gallery data from file
current_dir = os.path.dirname(__file__)
json_path = os.path.join(current_dir, 'data', 'galleries.json')

with open(json_path, 'r') as f:
    GALLERY_DATA = json.load(f)
    
# Endpoint to get all galleries
@app.route('/api/galleries', methods=['GET'])
def get_galleries():
    return jsonify(GALLERY_DATA)

# Endpoint to get shortest path between two galleries
@app.route('/api/shortest-path', methods=['GET'])
def get_shortest_path():
    start = request.args.get('start')
    end = request.args.get('end')

    if start in GALLERY_DATA and end in GALLERY_DATA:
        path = astar(GALLERY_DATA, start, end)
        return jsonify({"path": path})
    else:
        return jsonify({"error": "Invalid start or end point"}), 400

if __name__ == '__main__':
    app.run(debug=True)
