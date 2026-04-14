const STORAGE_KEY = 'mindbloom_journal';

function getEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
}

function saveEntry(prompt, text) {
  if (!text.trim()) return false;
  const entries = getEntries();
  entries.unshift({
    id: Date.now(),
    date: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    prompt,
    text: text.trim()
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  return true;
}

function deleteEntry(id) {
  const entries = getEntries().filter(e => e.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function renderEntries() {
  const list = document.getElementById('entry-list');
  if (!list) return;
  const entries = getEntries();
  if (entries.length === 0) {
    list.innerHTML = '<p style="color: var(--text-muted); font-size:14px;">No entries yet. Write your first one above!</p>';
    return;
  }
  list.innerHTML = entries.map(e => `
    <div class="entry-item">
      <div class="entry-date">${e.date}</div>
      <div class="entry-prompt">${e.prompt}</div>
      <div class="entry-text">${e.text}</div>
      <button onclick="deleteEntry(${e.id}); renderEntries();" style="margin-top:10px; font-size:12px; color:#E24B4A; background:none; border:none; cursor:pointer;">Delete</button>
    </div>
  `).join('');
}

function initJournal() {
  const p = getDailyPrompt();
  const promptEl = document.getElementById('daily-prompt');
  const hintEl = document.getElementById('prompt-hint');
  if (promptEl) promptEl.textContent = p.prompt;
  if (hintEl) hintEl.textContent = p.hint;

  const btn = document.getElementById('save-btn');
  const ta = document.getElementById('journal-textarea');
  const msg = document.getElementById('save-msg');

  if (btn && ta) {
    btn.addEventListener('click', () => {
      const saved = saveEntry(p.prompt, ta.value);
      if (saved) {
        ta.value = '';
        msg.style.display = 'block';
        msg.textContent = 'Beautiful entry! Keep it up 💚';
        setTimeout(() => msg.style.display = 'none', 3000);
        renderEntries();
      } else {
        msg.style.display = 'block';
        msg.textContent = 'Please write something first.';
        msg.style.color = '#E24B4A';
        setTimeout(() => { msg.style.display = 'none'; msg.style.color = ''; }, 2000);
      }
    });
  }

  renderEntries();
}
