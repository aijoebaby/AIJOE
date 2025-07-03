
// Auto-login via phone number
document.getElementById('login-btn').onclick = () => {
  const phone = document.getElementById('phone-input').value.trim();
  if (phone) {
    localStorage.setItem('userPhone', phone);
    initApp();
  }
};

function initApp() {
  document.getElementById('login-overlay').style.display = 'none';
  document.getElementById('app-container').style.display = 'block';
  const phone = localStorage.getItem('userPhone');
  appendMessage('AIJOE', 'Welcome, ' + phone + '! How can I help you?');
}

window.onload = () => {
  if (localStorage.getItem('userPhone')) {
    initApp();
  }
};

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');

function appendMessage(sender, message) {
  const div = document.createElement('div');
  div.className = sender === 'You' ? 'user' : 'bot';
  div.textContent = (sender === 'You' ? 'You' : 'AIJOE') + ': ' + message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = () => {
  const input = userInput.value.trim();
  if (!input) return;
  appendMessage('You', input);
  replyFromAIJOE(input);
  userInput.value = '';
};

function replyFromAIJOE(text) {
  const response = "AIJOE here! You said: " + text;
  appendMessage('AIJOE', response);
  speak(response);
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

// Voice recognition
if ('webkitSpeechRecognition' in window) {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  micBtn.onclick = () => recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    userInput.value = transcript;
    sendBtn.click();
  };
  recognition.onerror = (event) => console.error("Voice error:", event.error);
} else {
  micBtn.disabled = true;
  micBtn.title = "Voice recognition not supported";
}
