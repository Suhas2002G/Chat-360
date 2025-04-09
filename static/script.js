
// Handling Chatbot Icon Click (Show/Hide Chatbox)
document.getElementById("chatbot-icon").addEventListener("click", function () {
    let chatbox = document.getElementById("chatbot-box");

    if (chatbox.classList.contains("active")) {
        chatbox.classList.remove("active");
        setTimeout(() => {
            chatbox.style.display = "none"; // Hide after animation
        }, 300); // Match transition duration
    } else {
        chatbox.style.display = "flex"; // Ensure it's visible before transition
        setTimeout(() => chatbox.classList.add("active"), 10); // Delay for smooth effect
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const chatbotIcon = document.getElementById("chatbot-icon");
    const chatbotBox = document.getElementById("chatbot-box");
    const closeChatbot = document.getElementById("close-chatbot");
    const chatForm = document.getElementById("chat-form");
    const chatbox = document.getElementById("chatbox");
    const questionInput = document.getElementById("question");

    let userMessageCount = 0;  // Track user messages
    let typingSpeed = 7; // Typing speed 7 millisecond (adjustable)

    
    
    
    // Show chatbot when clicked
    chatbotIcon.addEventListener("click", function () {
        chatbotBox.style.display = "block";
    });

    // Close chatbot
    closeChatbot.addEventListener("click", function () {
        chatbotBox.style.display = "none";
    });

   
   
    // Function to get current time in HH:MM AM/PM format
    function getCurrentTime() {
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`;
    }

    
    
    
    // Typing effect function
    function typeText(element, text, index = 0, callback) {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            setTimeout(() => typeText(element, text, index + 1, callback), typingSpeed);
        } else if (callback) {
            callback();
        }
    }

    
    
    // Handle user message submission
    chatForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let userMessage = questionInput.value.trim();
        if (userMessage === "") return;

        // Display user message in Chatbox
        let userMsgElement = document.createElement("div");
        userMsgElement.classList.add("message-container", "user-container");
        userMsgElement.innerHTML = `
            <p class="user-message">${userMessage}</p>
            <span class="timestamp user-timestamp">${getCurrentTime()}</span>
        `;
        chatbox.appendChild(userMsgElement);
        questionInput.value = "";     //Clears the input field after sending.

        // Scroll to the latest message
        chatbox.scrollTop = chatbox.scrollHeight;


        // Increment message count
        userMessageCount++;


        // Fetch response from Flask backend
        let botMsgElement = document.createElement("div");
        botMsgElement.classList.add("message-container", "bot-container");
        botMsgElement.innerHTML = `
            <p class="bot-message"><span id="typing-indicator">...</span></p>
            `;
            // <span class="timestamp bot-timestamp">${getCurrentTime()}</span>
        chatbox.appendChild(botMsgElement);

        let response = await fetch("/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        let data = await response.json();
        let botMessage = data.bot_response;

        let typingIndicator = botMsgElement.querySelector("#typing-indicator");
        typingIndicator.innerHTML = "";
        typeText(typingIndicator, botMessage, 0);

        chatbox.scrollTop = chatbox.scrollHeight;
    });
});




