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
  getAIJOEReply(input);
  userInput.value = '';
};

function getAIJOEReply(text) {
  const response = generateResponse(text);
  appendMessage('AIJOE', response);
  speak(response);
}

function generateResponse(input) {
  const lower = input.toLowerCase();
  if (lower.includes("food") || lower.includes("eat")) {
    return "I'll help you find food nearby soon!";
  } else if (lower.includes("directions") || lower.includes("how do i get")) {
    return "Direction help is coming soon — for now, ask anything!";
  } else if (lower.includes("hello") || lower.includes("hi")) {
    return "Hi! I'm AIJOE, here for you 24/7.";
  } else {
    return "I'm here to help. Let me know what you need.";
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  speechSynthesis.speak(utterance);
}

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