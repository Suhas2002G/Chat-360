# Chat-360 AI Assistance

## 🧠 Overview

**Chat-360 AI Assistance** is an intelligent conversational assistant built with **Flask** and powered by **Groq's large language models**. This application provides contextual AI responses while maintaining conversation history through Flask sessions, enabling rich, stateful interactions with users.

---

## ✨ Key Features

- **Contextual Conversations**: Leverages session management to maintain conversation history, allowing the AI to reference previous exchanges when formulating responses.
- **Groq Integration**: Utilizes Groq's high-performance language models for fast, accurate responses.
- **LangChain Implementation**: Uses LangChain's chat model framework for simplified LLM integration.
- **Memory Persistence**: Retains conversation context between user interactions.
- **Environment Variable Support**: Secure API key management via dotenv.

---

## ⚙️ How It Works

Chat-360 maintains conversation history in the session, passing previous context along with new user queries to the LLM. This ensures that:

- The AI can provide responses informed by the entire conversation.
- Follow-up questions are handled naturally without repetition.
- The system can reference information shared earlier in the conversation.
- The user experience feels more natural and human-like.

---

## 🏗️ Technical Architecture

The application is built on **Flask** with several key components:

- Flask session management for conversation persistence.
- Groq API integration for LLM capabilities.
- Custom response module for handling AI interactions.
- Environment variable configuration for secure credential management.

---

## 🌐 Usage

Navigate to the application URL in your browser to start interacting with **Chat-360**. Your conversation history will be maintained throughout your session, allowing for natural, contextual interactions.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a **Pull Request** to improve features or fix bugs.

