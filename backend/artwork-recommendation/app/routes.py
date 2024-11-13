# app/routes.py
from flask import Blueprint, request, jsonify
from app.recommender import recommend_artworks
from app.met_api import search_artworks, get_artwork_by_id
import asyncio

main_routes = Blueprint('main_routes', __name__)

@main_routes.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    artwork_id = data.get('artwork_id')

    similar_artworks = asyncio.run(recommend_artworks(artwork_id))
    return jsonify({'similar_artworks': similar_artworks})

@main_routes.route('/search', methods=['GET'])
def search():
    query = request.args.get('q')
    artworks = search_artworks(query)
    return jsonify(artworks)