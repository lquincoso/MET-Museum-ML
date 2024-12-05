from flask import Blueprint, request, jsonify
import asyncio
import logging
from .recommender import recommend_artworks
from .met_api import search_artworks, get_artwork_by_id

main_routes = Blueprint('main_routes', __name__)

logging.basicConfig(level=logging.INFO)

@main_routes.route('/recommend', methods=['POST'])
def recommend():
    """
    Recommend similar artworks based on an artwork ID.
    """
    data = request.json
    logging.info(f"Received data: {data}")
    artwork_id = data.get('artwork_id')

    if not artwork_id:
        return jsonify({"error": "artwork_id is required"}), 400

    similar_artworks = asyncio.run(recommend_artworks(artwork_id))
    return jsonify({'similar_artworks': similar_artworks})


@main_routes.route('/search', methods=['GET'])
def search():
    """
    Search for artworks by a query string.
    """
    query = request.args.get('q')
    if not query:
        return jsonify({"error": "Search query is required"}), 400

    artworks = search_artworks(query)
    return jsonify(artworks)
