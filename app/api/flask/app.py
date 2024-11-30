import google.generativeai as genai
from flask import Flask, request, jsonify
import os

app = Flask(__name__)
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))


@app.route("/query", methods=["POST"])
def Query():
    if request.method == "POST":
        query = request.form.get("query")
        model = genai.GenerativeModel("gemini-1.5-flash")
        prompt = """
        The user has asked a query about a machine learning concept. The query is: '{query}'.
        Please provide the following:
        1. **Overview**: Give a concise definition or explanation of the concept in simple terms.
        2. **Detailed Explanation**: Expand on how the concept works, its purpose, and its importance in machine learning.
        3. **Mathematical Explanation**:
            - Derive any relevant mathematical formulas step-by-step.
            - Explain each term in the formula and its role in the concept.
        4. **Examples**: Provide simple, illustrative examples to make the concept easier to understand.
        5. **Advanced Notes**: If applicable, mention advanced aspects, variants, or edge cases of the concept.
        6. **Visualization Suggestions**: Suggest visual aids or animations to represent the concept effectively.
        7. **Output in a structured format**: Include numbered sections and use LaTeX for mathematical expressions.
        8. Ensure the response is suitable for generating animations and educational visuals.
        """
        gen_response = model.generate_content(prompt.format(query=query))
        candidates = gen_response._result.candidates
        if not candidates:
            return jsonify({"error": "No candidates returned by the AI model"}), 500

        content = candidates[0].content
        parts = content.parts if content else []
        if not parts:
            return jsonify({"error": "No content parts returned by the AI model"}), 500

        generated_text = " ".join(part.text for part in parts)

        citation_sources = [
            {
                "start_index": source.start_index,
                "end_index": source.end_index,
                "uri": source.uri,
            }
            for source in candidates[0].citation_metadata.citation_sources
        ]

        return (
            jsonify(
                {
                    "generated_text": generated_text,
                    "citation_sources": citation_sources,
                    "usage_metadata": {
                        "prompt_token_count": gen_response._result.usage_metadata.prompt_token_count,
                        "candidates_token_count": gen_response._result.usage_metadata.candidates_token_count,
                        "total_token_count": gen_response._result.usage_metadata.total_token_count,
                    },
                }
            ),
            200,
        )


if __name__ == "__main__":
    app.run()
