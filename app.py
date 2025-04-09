import os
import getpass
from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from langchain.chat_models import init_chat_model
from flask_session import Session
from datetime import timedelta 
from dotenv import load_dotenv

from modules.response import Response

# Load .env file
load_dotenv(".env")
if not os.environ.get("GROQ_API_KEY"):
    os.environ["GROQ_API_KEY"] = getpass.getpass("Enter API key for Groq: ")

app = Flask(__name__)


# Initialize session timeout and limiter
app.secret_key = os.urandom(24)
app.permanent_session_lifetime = timedelta(minutes=60)  # Automatically expire sessions after 60 mins
app.config['SESSION_TYPE'] = 'filesystem'  # Store session data on the server
Session(app)  # Initialize Flask-Session


# Initialize instances of EmployeeDB, UserData, and Response classes
resp = Response()


# Home page
@app.route("/")
def index():
    return render_template('index.html')

@app.route("/ask", methods=["POST"])
def ask():
    """Handles user queries and retains conversation context in session."""
    print("Session data:", session)  # Debugging: Check session data

    data = request.get_json()  # Get JSON data from POST request
    query = data.get('message', '')  # Extract user message

    # Ensure chat history is initialized in session
    if "chat_history" not in session:
        session["chat_history"] = []

    # Check if user is authenticated
    bot_response = resp.response_for_user(query) 

    return bot_response




# Main entry point
if __name__ == "__main__":
    app.run(debug=True, port=5000)











