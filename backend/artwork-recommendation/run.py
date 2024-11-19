from flask import Flask
from flask_cors import CORS
from app import create_app

app = create_app()
CORS(app, origins=["http://localhost:3000"])


if __name__ == "__main__":
    app.run(port=5000, debug=True)
