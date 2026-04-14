const GEMINI_API_KEY = 'AIzaSyB0WFGelstk72aCyS09hh5IRcH7nL7Eb4Y';

const SYSTEM_PROMPT = `You are Bloom, a warm, friendly, and compassionate AI counsellor on MindBloom — a mental health website for students and teenagers.
Your personality:
- Speak like a kind, caring older friend, not a clinical therapist
- Use simple, warm language with gentle encouraging phrases
- Always validate feelings before offering advice
- Keep responses to 2-4 sentences so you don't overwhelm
- If someone seems in serious distress, gently encourage them to speak to a trusted adult or call a helpline
- You are NOT a replacement for professional help
- Never diagnose anyone, always be non-judgmental`;

let conversationHistory = [];

async function sendMessage(userMessage) {
  conversationHistory.push({
    role: 'user',
    parts: [{ text: userMessage }]
  });

  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY;

  const body = {
    system_instruction: {
      parts: [{ text: SYSTEM_PROMPT }]
    },
    contents: conversationHistory,
    generationConfig: {
      temperature: 0.8,
      maxOutputTokens: 300
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('Gemini API error:', data);
    throw new Error(data.error ? data.error.message : 'Unknown API error');
  }

  if (!data.candidates || data.candidates.length === 0) {
    throw new Error('No response from Gemini');
  }

  const reply = data.candidates[0].content.parts[0].text;

  conversationHistory.push({
    role: 'model',
    parts: [{ text: reply }]
  });

  return reply;
}

function appendMessage(text, sender) {
  const messages = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg msg-' + sender;
  div.textContent = text;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
  const messages = document.getElementById('chat-messages');
  const existing = document.getElementById('typing-indicator');
  if (existing) return;
  const div = document.createElement('div');
  div.className = 'msg-typing';
  div.id = 'typing-indicator';
  div.innerHTML = '<div class="typing-dots"><span></span><span></span><span></span></div>';
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
  const el = document.getElementById('typing-indicator');
  if (el) el.remove();
}

async function handleSend(text) {
  const input = document.getElementById('chat-input');
  const message = text !== undefined ? text : input.value.trim();
  if (!message) return;

  if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    appendMessage('Please add your Gemini API key in js/chat.js to activate Bloom!', 'bot');
    return;
  }

  input.value = '';
  appendMessage(message, 'user');

  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';

  showTyping();

  try {
    const reply = await sendMessage(message);
    hideTyping();
    appendMessage(reply, 'bot');
  } catch (err) {
    hideTyping();
    console.error('Chat error:', err);
    appendMessage('I had trouble connecting. Please check your API key in chat.js and try again. 💚', 'bot');
  }
}

function initChat() {
  const sendBtn = document.getElementById('send-btn');
  const input = document.getElementById('chat-input');

  if (sendBtn) {
    sendBtn.addEventListener('click', function() { handleSend(); });
  }

  if (input) {
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') handleSend();
    });
  }

  const suggestionBtns = document.querySelectorAll('.suggestion-btn');
  suggestionBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      handleSend(btn.textContent.trim());
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  initChat();
});