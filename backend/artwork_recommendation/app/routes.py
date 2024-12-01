from flask import Blueprint, request, jsonify
import asyncio
import logging

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from artwork_recommendation.app.recommender import recommend_artworks
from artwork_recommendation.app.met_api import search_artworks, get_artwork_by_id


main_routes = Blueprint('main_routes', __name__)

logging.basicConfig(level=logging.INFO)

@main_routes.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    logging.info(f"Received data: {data}")
    artwork_id = data.get('artwork_id')
    logging.info(f"Extracted artwork_id: {artwork_id}")

    similar_artworks = asyncio.run(recommend_artworks(artwork_id))
    return jsonify({'similar_artworks': similar_artworks})

@main_routes.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    artworks = search_artworks(query)
    return jsonify(artworks)
