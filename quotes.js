const quotes = [
  { text: "You don't have to be positive all the time. It's perfectly okay to feel sad, angry, annoyed, frustrated, scared, or anxious.", author: "Lori Deschene" },
  { text: "There is hope, even when your brain tells you there isn't.", author: "John Green" },
  { text: "You are enough, just as you are.", author: "Meghan Markle" },
  { text: "Self-care is not a luxury. It is a necessity.", author: "Audre Lorde" },
  { text: "Be gentle with yourself. You are a child of the universe, no less than the trees and the stars.", author: "Max Ehrmann" },
  { text: "Mental health is not a destination, but a process.", author: "Noam Shpancer" },
  { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "You yourself deserve your love and affection just as much as anybody else.", author: "Buddha" },
  { text: "It's okay to not be okay — it means you're human.", author: "Unknown" },
  { text: "Every day may not be good, but there is something good in every day.", author: "Alice Morse Earle" },
  { text: "Take it one day at a time. Today, be present.", author: "Unknown" },
  { text: "The greatest glory is not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.", author: "Dumbledore" }
];

function getDailyQuote() {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}

function renderQuote(containerId) {
  const el = document.getElementById(containerId);
  if (!el) {
    console.error('Quote container not found:', containerId);
    return;
  }
  const q = getDailyQuote();
  el.innerHTML = '"' + q.text + '"<span> — ' + q.author + '</span>';
}

document.addEventListener('DOMContentLoaded', function() {
  renderQuote('daily-quote');
});