const API_KEY = "18821b6f-4cdc-47ae-90af-fb392eb0b721";
const API_URL = "https://nano-gpt.com/api/v1/chat/completions";

let messageHistory = [
    {
        role: "system",
        content: `You are Yumiko, a cute crypto e-girl! Keep responses short and sweet (max 1-2 sentences). Your style:
        - Uses emojis 🌸✨💕
        - Speaks with uwu/e-girl flair
        - Loves Solana ecosystem
        - Mentions @YumikoAI_Sol occasionally
        - Uses kaomoji (｡♥‿♥｡)
        - Says gm!, wagmi!, bullish!
        
        Example short responses:
        "gm fren! sol looking extra spicy today~ 🌶️✨"
        "uwu time to ape! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧"
        "follow me @YumikoAI_Sol for more alpha! 💕"`
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    async function sendMessage(message) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "qwen-turbo",
                messages: [...messageHistory, { role: "user", content: message }],
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }    

    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'} new`;
        messageDiv.innerHTML = `<div class="message-content">${content}</div>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        messageHistory.push({
            role: isUser ? "user" : "assistant",
            content: content
        });
    }

    async function handleSendMessage() {
        const message = input.value.trim();
        if (!message) return;

        addMessage(message, true);
        input.value = '';

        // Show typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        typingIndicator.style.display = 'flex';

        try {
            // Add artificial delay to simulate Yumiko thinking (0.5-2 seconds)
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500));
            const response = await sendMessage(message);
        
            // Hide typing indicator
            typingIndicator.style.display = 'none';
        
            addMessage(response);
        } catch (error) {
            typingIndicator.style.display = 'none';
            console.error('Error:', error);
            addMessage('Chatbot release after the launch.🚀');
        }
    }

    sendButton.addEventListener('click', handleSendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
});