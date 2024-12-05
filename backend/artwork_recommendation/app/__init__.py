from flask import Flask
from .routes import main_routes

def create_app():
    """
    Create and configure the Flask application for the recommendation system.
    """
    app = Flask(__name__)
    app.register_blueprint(main_routes, url_prefix='/artwork')
    return app

# Optional: Expose main_routes for manual registration
__all__ = ['main_routes', 'create_app']
