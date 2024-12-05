from flask import Flask
from flask_cors import CORS
from artwork_recommendation.app.routes import main_routes
from education import register_blueprints as register_education_blueprints
from tour import register_blueprints as register_tour_blueprints

# Initialize the main Flask app
app = Flask(__name__)
CORS(app)

# Register the artwork recommendation blueprint
app.register_blueprint(main_routes, url_prefix='/artwork')

# Register blueprints for other features
register_education_blueprints(app)
register_tour_blueprints(app)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
