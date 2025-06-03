// /lib/theme.js
// /lib/theme.js
export function applyPalette({ background, primary, secondary, accent, id }) {
  const root = document.documentElement;
  root.style.setProperty('--bg',        background);
  root.style.setProperty('--primary',   primary);
  root.style.setProperty('--secondary', secondary);
  root.style.setProperty('--accent',    accent);
  // persist only the palette id
  localStorage.setItem('themePalette',  id);
}
