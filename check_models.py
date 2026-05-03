import google.generativeai as genai
import os

# If you use a .env file, uncomment the next two lines:
from dotenv import load_dotenv
load_dotenv()

# Use your key string directly here for a quick test
api_key = os.getenv("GOOGLE_API_KEY")

genai.configure(api_key=api_key)

print("Searching for models that support 'embedContent'...")
try:
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"✅ USE THIS NAME: {m.name}")
except Exception as e:
    print(f"❌ Error connecting to Google API: {e}")
