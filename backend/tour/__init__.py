from .tour_blueprint import tour_blueprint

def register_blueprints(app):
    app.register_blueprint(tour_blueprint, url_prefix='/tour')
