from flask import Blueprint, request, jsonify
import os
import google.generativeai as genai


education_blueprint = Blueprint("education", __name__)

api_key = genai.configure(api_key=os.getenv('GENAI_API_KEY'))
model = genai.GenerativeModel("gemini-1.5-flash")

@education_blueprint.route('/materials', methods=['GET'])
def get_materials():
    """
    Endpoint to fetch educational materials.
    """
    materials = [
        {"id": 1, "title": "Art History Basics", "type": "Course"},
        {"id": 2, "title": "Understanding Modern Art", "type": "Article"},
    ]
    return jsonify({"materials": materials})


@education_blueprint.route('/api/gemini', methods=['POST'])
def generate_response():
    """
    Endpoint to interact with generative AI.
    """
    try:
        data = request.get_json()
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        response = model.generate_content(prompt)
        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": "Internal server error", "details": str(e)}), 500
