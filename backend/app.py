import os
import io
import json
import openai
import cv2
import numpy as np
from flask import Flask, request, jsonify
from PIL import Image
from io import BytesIO
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)

CORS(app, origins=["http://localhost:3000"])  # Allow requests from React on localhost:3000


# Dummy function for image recognition - In reality, you would use a pre-trained model
def recognize_ingredients(image_path):
    print("pulkittttt")
    print(image_path)
    # For demo purposes, return a static list of ingredients
    # In real-world use, you would replace this with a model that recognizes food ingredients from the image
    # if image_path == 'image1':
    return ["chicken", "onion", "olive oil", "garlic", "salt", "red pepper", "black pepper", "ginger", "onion", "turmeric"]
    # else:
        # return ["bread", "mayonnaise", "tomato", "onion", "avocado", "cucumber", "carrot", "lettuce", "cheese"]


def generate_recipes(ingredients):
    # Define recipe_types at the beginning to avoid UnboundLocalError
    recipe_types = ["High Carb", "Low Carb", "High Protein", "Low Fat"]
    default_steps = [
        "Prepare all ingredients and equipment",
        "Mix ingredients according to proportions",
        "Cook until done and serve hot"
    ]
    
    # Define default macros outside the try block
    default_macros = {
        "High Carb": {"carbohydrates": 65, "protein": 20, "fats": 15},
        "Low Carb": {"carbohydrates": 15, "protein": 45, "fats": 40},
        "High Protein": {"carbohydrates": 25, "protein": 55, "fats": 20},
        "Low Fat": {"carbohydrates": 50, "protein": 40, "fats": 10}
    }

    prompt = f"""You are a recipe assistant. Create exactly 4 recipes using these ingredients: {', '.join(ingredients)}
    Each recipe must follow these categories exactly:
    1. High Carb
    2. Low Carb
    3. High Protein
    4. Low Fat

    Return the response in this exact JSON format:
    {{
        "recipes": [
            {{
                "recipeName": "Recipe name here - MUST NOT BE EMPTY",
                "recipeType": "MUST BE ONE OF: High Carb, Low Carb, High Protein, or Low Fat",
                "steps": [
                    "Step 1 description",
                    "Step 2 description",
                    "Step 3 description",
                    "..." 
                ],
                "macros": {{
                    "carbohydrates": number,
                    "protein": number,
                    "fats": number
                }}
            }}
        ]
    }}
    """

    try:
        # OpenAI API call
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a precise recipe assistant that always returns valid JSON."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )

        # Parse the response
        content = response.choices[0].message.content
        print("OpenAI Response:", content)  # Debug print
        
        try:
            recipes_data = json.loads(content)
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            # Return default recipes if JSON parsing fails
            return {
                "recipes": [
                    {
                        "recipeName": f"Basic {recipe_type} Recipe",
                        "recipeType": recipe_type,
                        "steps": default_steps,
                        "macros": default_macros[recipe_type]
                    } for recipe_type in recipe_types
                ]
            }

        # Validate and fix the response
        validated_recipes = []

        for recipe in recipes_data.get("recipes", []):
            # Validate recipe name
            if not recipe.get("recipeName") or recipe["recipeName"].strip() == "":
                recipe["recipeName"] = "Basic " + recipe.get("recipeType", "Recipe")

            # Validate recipe type
            if recipe.get("recipeType") not in recipe_types:
                recipe["recipeType"] = recipe_types[0]

            # Validate steps
            steps = recipe.get("steps", [])
            if not isinstance(steps, list):
                steps = []
            steps = [step for step in steps if isinstance(step, str) and step.strip()]
            while len(steps) < 3:
                steps.extend(default_steps)
            recipe["steps"] = steps[:max(3, len(steps))]

            # Validate macros
            macros = recipe.get("macros", {})
            if not isinstance(macros, dict):
                macros = {}

            # Get default values based on recipe type
            recipe_type = recipe["recipeType"]
            default = default_macros[recipe_type]
            
            current_macros = {
                "carbohydrates": macros.get("carbohydrates", default["carbohydrates"]),
                "protein": macros.get("protein", default["protein"]),
                "fats": macros.get("fats", default["fats"])
            }

            # Adjust values to sum to 100
            total = sum(current_macros.values())
            if total != 100:
                factor = 100 / total
                current_macros = {k: round(v * factor) for k, v in current_macros.items()}
                # Adjust rounding errors
                diff = 100 - sum(current_macros.values())
                if diff != 0:
                    current_macros["protein"] += diff

            recipe["macros"] = current_macros
            validated_recipes.append(recipe)

        # Ensure we have exactly 4 recipes
        while len(validated_recipes) < 4:
            for recipe_type in recipe_types:
                if len(validated_recipes) >= 4:
                    break
                validated_recipes.append({
                    "recipeName": f"Basic {recipe_type} Recipe",
                    "recipeType": recipe_type,
                    "steps": default_steps,
                    "macros": default_macros[recipe_type]
                })

        return {"recipes": validated_recipes[:4]}

    except Exception as e:
        print(f"Error in generate_recipes: {str(e)}")
        # Return default recipes in case of any error
        return {
            "recipes": [
                {
                    "recipeName": f"Basic {recipe_type} Recipe",
                    "recipeType": recipe_type,
                    "steps": default_steps,
                    "macros": default_macros[recipe_type]
                } for recipe_type in recipe_types
            ]
        }

# Route to accept image upload
@app.route('/generate-recipes', methods=['POST'])
def generate_recipes_from_image():
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400

    # Get image file from request
    print(request.files)
    print("~~~~~~~~~~~~~~")
    image_file = request.files['image']
    print(image_file)
    img = Image.open(image_file.stream)

    # Convert the image to RGB if it is in RGBA mode (for transparent images)
    if img.mode == 'RGBA':
        img = img.convert('RGB')

    # Save image temporarily for processing
    image_path = "uploaded_image.jpg"
    img.save(image_path, 'JPEG')  # Save as JPEG now that it's in RGB mode
    print('imageeee')

    # Recognize ingredients from the uploaded image
    ingredients = recognize_ingredients(image_path)
    print('=================')
    print(ingredients)

    # Generate recipes based on recognized ingredients
    recipes = generate_recipes(ingredients)
    print('=================')
    print(recipes)

    # Return recipes as JSON response
    return jsonify({"recipes": recipes})

if __name__ == '__main__':
    app.run(debug=True)
