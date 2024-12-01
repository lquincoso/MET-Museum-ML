from flask import Flask

import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '../../')))
from artwork_recommendation.app.routes import main_routes

def create_app():
    app = Flask(__name__)
    app.register_blueprint(main_routes) 
    return app
