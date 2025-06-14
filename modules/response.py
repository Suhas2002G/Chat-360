import os
from flask import jsonify, session
import getpass
from langchain.chat_models import init_chat_model
from dotenv import load_dotenv

# Load environment variables
load_dotenv(".env")
if not os.environ.get("GROQ_API_KEY"):
    os.environ["GROQ_API_KEY"] = getpass.getpass("Enter API key for Groq: ")



class Response:
    '''Provides response to user based on previous 5 context'''
    def store_chat(self, user_input, bot_response):
        """Store conversation history in session, ensuring it runs only within a request context."""
        if "chat_history" not in session:
            session["chat_history"] = []
        
        session["chat_history"].append({"user": user_input, "bot": bot_response})

        # Keep only the last 5 exchanges for memory efficiency
        session["chat_history"] = session["chat_history"][-5:]
        session.modified = True  #Ensures that Flask recognizes that the session data has been modified and should be saved.

    def get_previous_context(self):
        """Retrieve the last few messages from chat history."""
        return session.get("chat_history", [])[-5:]  # Limit history to last 5 exchanges

    def generate_response(self, model_name, query):
        """Generate response using Groq LLM with context awareness."""
        llm = init_chat_model(model_name, model_provider="groq", max_tokens=150)

        # Retrieve past messages for context
        past_context = self.get_previous_context()

        # Converts the retrieved past chat history into a formatted string, making it readable for the chatbot model.
        context_text = " ".join([f"User: {msg['user']} | Bot: {msg['bot']}" for msg in past_context]) if past_context else ""

        # Modify query to include previous context
        # Constructs the final query by appending the previous conversation context to the user's current input.
        # This helps the chatbot maintain continuity in the conversation.
        full_query = f"Previous Context: {context_text}\nUser: {query}"
        response = llm.invoke(full_query)

        bot_response = response.content
        self.store_chat(query, bot_response)

        return jsonify({"bot_response": bot_response})

    def response_for_user(self, query):
        """Generate response for a non-authenticated user."""
        return self.generate_response("gemma2-9b-it", query)



