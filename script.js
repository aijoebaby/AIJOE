document.getElementById('micButton').onclick = () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.start();
  recognition.onresult = (event) => {
    const text = event.results[0][0].transcript;
    respondToInput(text);
  };
};

document.getElementById('sendText').onclick = () => {
  const text = document.getElementById('userInput').value;
  respondToInput(text);
};

function respondToInput(input) {
  let response = "I'm not sure how to help yet.";
  input = input.toLowerCase();

  if (input.includes("food")) response = "Let me find food places near you.";
  else if (input.includes("directions")) response = "Where do you want to go?";
  else if (input.includes("help")) response = "Calling for help...";
  else if (input.includes("uber")) response = "Opening Uber...";
  else if (input.includes("fix") || input.includes("tech")) response = "Let me try to help fix that.";
  else if (input.includes("hello") || input.includes("aijoe")) response = "Hey, I'm here. What do you need?";

  document.getElementById('response').innerText = response;
}
