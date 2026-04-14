const journalPrompts = [
  { prompt: "What made you smile today?", hint: "Even the tiniest thing counts 🌱" },
  { prompt: "Name 3 things you are grateful for today.", hint: "Big or small, they all matter." },
  { prompt: "What is one kind thing you did for yourself today?", hint: "Self-care shows up in many forms." },
  { prompt: "What is something you are looking forward to?", hint: "Let your imagination wander." },
  { prompt: "Who is someone that made your day better? How?", hint: "Appreciate the people around you." },
  { prompt: "What is a challenge you faced today and how did you handle it?", hint: "Every challenge is a lesson." },
  { prompt: "Write about a moment today where you felt at peace.", hint: "Even one second of peace is worth noting." },
  { prompt: "What is one thing you love about yourself?", hint: "Be kind — you deserve your own love." },
  { prompt: "What song, book, or movie made you feel good recently?", hint: "Good art nourishes the mind." },
  { prompt: "If today had a color, what would it be and why?", hint: "Express yourself freely." },
  { prompt: "What is one goal you have for tomorrow?", hint: "Small steps add up to big journeys." },
  { prompt: "Describe your perfect calm day.", hint: "Visualizing peace can bring peace." },
  { prompt: "What is something new you learned today?", hint: "Every day teaches us something." },
  { prompt: "Write a letter to your future self.", hint: "What do you want them to know?" }
];

function getDailyPrompt() {
  const day = Math.floor(Date.now() / 86400000);
  return journalPrompts[day % journalPrompts.length];
}
