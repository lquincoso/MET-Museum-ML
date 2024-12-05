from .education_blueprint import education_blueprint

def register_blueprints(app):
    app.register_blueprint(education_blueprint, url_prefix='/education')
