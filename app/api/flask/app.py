import subprocess
import cloudinary.uploader
from flask_cors import CORS
import os
import json
from flask import Flask, request, jsonify, send_file
import google.generativeai as genai
from dotenv import load_dotenv
from functools import lru_cache
import cloudinary
import shutil

load_dotenv()

app = Flask(__name__)
CORS(app)

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

os.environ["CLOUDINARY_URL"] = (
    "CLOUDINARY_URL=cloudinary://984692373379189:UOQ9byFO87Q_6zOdxRyYKfwbJEk@dvovo1lfg"
)

cloudinary.config(
    cloud_name="dvovo1lfg",
    api_key="984692373379189",
    api_secret="UOQ9byFO87Q_6zOdxRyYKfwbJEk",
)


@lru_cache(maxsize=1)
def get_model():
    return genai.GenerativeModel("gemini-1.5-flash")


GENERATION_CONFIG = {
    "temperature": 0.3,
    "max_output_tokens": 4096,
    "response_mime_type": "application/json",
}


MANIM_PROMPT = """
For the machine learning concept: '{query}'

Please generate a JSON response with two main keys:
1. "theory": A comprehensive theoretical explanation
2. "manim_code": Complete Manim Python code for visualization

Steps to follow:
- First generate the plan for it with some steps
- Then work on that plan and make it the best

Important Guidelines for Manim Code:
- The code must be a complete, valid Python script.
- Include ALL necessary imports (e.g., from manim import *).
- Create a Scene subclass with a construct() method.
- Ensure coordinates and animations are properly handled.
- Use clear, educational visualization techniques.
- Handle potential runtime errors gracefully.
- Avoid using deprecated functions or methods.
- Ensure the code is well-commented for clarity.
- Give code for a video of at least 1 minute.
- Add all the aspects of the educational video like first introducing, then explaining the concept in detail.
- Use beautiful animations and transitions to make the visualization engaging.
- Include color schemes, smooth transformations, and interactive elements where possible.
- Prioritize code that will successfully render a Manim animation without errors.
- Ensure the code is tested and verified to work correctly.

JSON Structure:
{{
    "theory": {{
        "description": "Detailed explanation of the concept",
        "key_points": ["Point 1", "Point 2", ...],
        "mathematical_background": "Relevant mathematical foundations",
        "practical_applications": ["Application 1", "Application 2", ...]
    }},
    "manim_code": "Full Python Manim code for visualization"
}}

Example of a valid Manim code structure:

```python
from manim import *

class ExampleScene(Scene):
    def construct(self):
        # Your Manim code here
        pass
Prioritize code that will successfully render a Manim animation without errors. Ensure the code is tested and verified to work correctly.Do everything in the middle of the video
"""


@app.route("/query", methods=["POST"])
def query():
    print("Request to /query")
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        query = data.get("query")
        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Get cached model instance
        model = get_model()

        try:
            print(query)
            gen_response = model.generate_content(
                MANIM_PROMPT.format(query=query), generation_config=GENERATION_CONFIG
            )

            if not gen_response.parts:
                return jsonify({"error": "No response generated"}), 500

            generated_text = gen_response.parts[0].text
            parsed_response = json.loads(generated_text)
            return (
                jsonify(
                    {
                        "theory": parsed_response["theory"],
                        "code": parsed_response["manim_code"],
                    }
                ),
                200,
            )

            # try:
            #     parsed_response = json.loads(generated_text)

            #     if not parsed_response.get("theory") or not parsed_response.get(
            #         "manim_code"
            #     ):
            #         return (
            #             jsonify(
            #                 {
            #                     "error": "Invalid response structure",
            #                     "raw_response": generated_text,
            #                 }
            #             ),
            #             500,
            #         )

            #     os.makedirs("manim_scripts", exist_ok=True)

            #     filename = f"manim_{query.replace(' ', '_').lower()}.py"
            #     file_path = os.path.join("manim_scripts", filename)
            #     fileDir = os.getcwd()
            #     filenamewithoutpy = filename.replace(".py", "")
            #     videoOutDir = os.path.join(
            #         fileDir, "media", "videos", filenamewithoutpy, "480p15"
            #     )

            #     with open(file_path, "w") as f:
            #         f.write(parsed_response["manim_code"])

            #     try:
            #         result = subprocess.run(
            #             ["manim", "-ql", str(file_path)],
            #             capture_output=True,
            #             text=True,
            #             check=True,
            #             cwd=fileDir,
            #             timeout=300,
            #         )

            #         if result.returncode != 0:
            #             return (
            #                 jsonify(
            #                     {
            #                         "error": "Manim rendering failed",
            #                         "stdout": result.stdout,
            #                         "stderr": result.stderr,
            #                     }
            #                 ),
            #                 500,
            #             )

            #         video_files = [
            #             f for f in os.listdir(videoOutDir) if f.endswith(".mp4")
            #         ]

            #         if not video_files:
            #             return (
            #                 jsonify(
            #                     {
            #                         "error": "No video file generated",
            #                         "stdout": result.stdout,
            #                         "stderr": result.stderr,
            #                     }
            #                 ),
            #                 500,
            #             )

            #         video_filename = video_files[0]
            #         full_video_path = os.path.join(videoOutDir, video_filename)

            #         return (
            #             send_file(
            #                 full_video_path,
            #                 mimetype="video/mp4",
            #                 as_attachment=True,
            #                 download_name=f"{query.replace(' ', '_')}_visualization.mp4",
            #             ),
            #             200,
            #         )

            #     except subprocess.TimeoutExpired:
            #         return (
            #             jsonify(
            #                 {
            #                     "error": "Manim rendering timed out",
            #                 }
            #             ),
            #             500,
            #         )

            #     except Exception as manim_error:
            #         return (
            #             jsonify(
            #                 {
            #                     "error": f"Manim execution error: {str(manim_error)}",
            #                 }
            #             ),
            #             500,
            #         )

            # except json.JSONDecodeError:
            # return (
            #     jsonify(
            #         {
            #             "error": "Generated response was not valid JSON",
            #             "raw_response": generated_text,
            #         }
            #     ),
            #     500,
            # )

        except Exception as model_error:
            return (
                jsonify({"error": f"Model generation error: {str(model_error)}"}),
                500,
            )

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


@app.route("/query-upload", methods=["POST"])
def queryupload():
    try:
        if not request.is_json:
            return jsonify({"error": "Request must be JSON"}), 400

        data = request.get_json()
        query = data.get("query")

        if not query:
            return jsonify({"error": "Query is required"}), 400

        # Get cached model instance
        model = get_model()

        try:
            gen_response = model.generate_content(
                MANIM_PROMPT.format(query=query), generation_config=GENERATION_CONFIG
            )

            if not gen_response.parts:
                return jsonify({"error": "No response generated"}), 500

            generated_text = gen_response.parts[0].text

            try:
                parsed_response = json.loads(generated_text)

                if not parsed_response.get("theory") or not parsed_response.get(
                    "manim_code"
                ):
                    return (
                        jsonify(
                            {
                                "error": "Invalid response structure",
                                "raw_response": generated_text,
                            }
                        ),
                        500,
                    )

                os.makedirs("manim_scripts", exist_ok=True)

                filename = f"manim_{query.replace(' ', '_').lower()}.py"
                file_path = os.path.join("manim_scripts", filename)
                fileDir = os.getcwd()
                filenamewithoutpy = filename.replace(".py", "")
                videoOutDir = os.path.join(
                    fileDir, "media", "videos", filenamewithoutpy, "480p15"
                )

                with open(file_path, "w") as f:
                    f.write(parsed_response["manim_code"])

                try:
                    result = subprocess.run(
                        ["manim", "-ql", str(file_path)],
                        capture_output=True,
                        text=True,
                        check=True,
                        cwd=fileDir,
                        timeout=300,
                    )

                    if result.returncode != 0:
                        return (
                            jsonify(
                                {
                                    "error": "Manim rendering failed",
                                    "stdout": result.stdout,
                                    "stderr": result.stderr,
                                }
                            ),
                            500,
                        )

                    video_files = [
                        f for f in os.listdir(videoOutDir) if f.endswith(".mp4")
                    ]

                    if not video_files:
                        return (
                            jsonify(
                                {
                                    "error": "No video file generated",
                                    "stdout": result.stdout,
                                    "stderr": result.stderr,
                                }
                            ),
                            500,
                        )

                    video_filename = video_files[0]
                    full_video_path = os.path.join(videoOutDir, video_filename)
                    print(full_video_path)
                    url = cloudinary.uploader.upload_large(full_video_path)
                    print(url)

                    return (jsonify({"url": url}), 200)

                    # return send_file(
                    #     full_video_path,
                    #     mimetype='video/mp4',
                    #     as_attachment=True,
                    #     download_name=f"{query.replace(' ', '_')}_visualization.mp4"
                    # ), 200

                except subprocess.TimeoutExpired:
                    return (
                        jsonify(
                            {
                                "error": "Manim rendering timed out",
                            }
                        ),
                        500,
                    )

                except Exception as manim_error:
                    return (
                        jsonify(
                            {
                                "error": f"Manim execution error: {str(manim_error)}",
                            }
                        ),
                        500,
                    )

            except json.JSONDecodeError:
                return (
                    jsonify(
                        {
                            "error": "Generated response was not valid JSON",
                            "raw_response": generated_text,
                        }
                    ),
                    500,
                )

        except Exception as model_error:
            return (
                jsonify({"error": f"Model generation error: {str(model_error)}"}),
                500,
            )

    except Exception as e:
        return jsonify({"error": f"Unexpected error: {str(e)}"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))

    app.run(
        host="0.0.0.0", port=port, debug=os.getenv("FLASK_DEBUG", "False") == "True"
    )
