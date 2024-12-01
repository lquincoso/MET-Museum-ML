from flask import Flask, request, jsonify
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

openai.api_key = "OPEN-AI-KEY"

@app.route("/api/chatgpt", methods=["POST"])
def chatgpt():
    try:
        data = request.json
        prompt = data.get("prompt", "").strip()
        
        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7,
        )

        chatgpt_response = response.choices[0].message["content"].strip()
        return jsonify({"response": chatgpt_response}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
