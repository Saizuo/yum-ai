function createStar() {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3}px;
        height: ${Math.random() * 3}px;
        background: white;
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        animation: twinkle ${Math.random() * 3 + 2}s infinite;
        opacity: ${Math.random()};
    `;
    return star;
}

function initStars() {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 200; i++) {
        starsContainer.appendChild(createStar());
    }
}

document.addEventListener('DOMContentLoaded', initStars);

const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

function glitchTypeWriter(element) {
    const baseText = "this is an ";
    const texts = [
        "experiment",
        "AI crypto girl",
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let glitchTimeout;
    
    function addGlitchEffect() {
        element.classList.add('glitch');
        clearTimeout(glitchTimeout);
        glitchTimeout = setTimeout(() => {
            element.classList.remove('glitch');
        }, 150);
    }
    
    function type() {
        const currentText = texts[textIndex];
        const shouldGlitch = Math.random() < 0.1;
        
        if (shouldGlitch) addGlitchEffect();
        
        if (isDeleting) {
            element.innerHTML = baseText + currentText.substring(0, charIndex-1);
            charIndex--;
        } else {
            element.innerHTML = baseText + currentText.substring(0, charIndex+1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000;
            addGlitchEffect();
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
            addGlitchEffect();
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const element = document.querySelector('.experiment');
    glitchTypeWriter(element);
});

// Add this to your existing script.js
function initChat() {
    const chatMessages = document.querySelector('.chat-messages');
    const inputField = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');

    async function sendMessage(message) {
        console.log('Sending message:', message);
    
        // Add user message to chat
        const userMessageDiv = document.createElement('div');
        userMessageDiv.className = 'message user new';
        userMessageDiv.innerHTML = `<div class="message-content">${message}</div>`;
        chatMessages.appendChild(userMessageDiv);
    
        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });
        
            console.log('Response received:', response);
            const data = await response.json();
            console.log('Data:', data);
        
            // Add bot response
            const botMessageDiv = document.createElement('div');
            botMessageDiv.className = 'message bot new';
            botMessageDiv.innerHTML = `<div class="message-content">${data.response}</div>`;
            chatMessages.appendChild(botMessageDiv);
        
        } catch (error) {
            console.log('Error:', error);
            // Add error message to chat
            const errorDiv = document.createElement('div');
            errorDiv.className = 'message bot new';
            errorDiv.innerHTML = `<div class="message-content">Oops! Something went wrong. Please try again! 💫</div>`;
            chatMessages.appendChild(errorDiv);
        }
    
        // Clear input and scroll
        inputField.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    sendButton.addEventListener('click', () => {
        const message = inputField.value.trim();
        if (message) {
            sendMessage(message);
        }
    });

    inputField.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const message = inputField.value.trim();
            if (message) {
                sendMessage(message);
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initChat);
