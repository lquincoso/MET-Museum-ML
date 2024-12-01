from flask import Flask, request, jsonify
import google.generativeai as genai
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

api_key = os.getenv('GENAI_API_KEY')

model = genai.GenerativeModel("gemini-1.5-flash")

@app.route("/api/gemini", methods=["POST"])
def generate_response():
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        response = model.generate_content(prompt)

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)
