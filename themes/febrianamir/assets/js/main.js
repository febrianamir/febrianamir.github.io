document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const btn = document.getElementById('header-theme-toggle');
  
  const setTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  };

  const toggle = () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    setTheme(newTheme);
  };

  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Default to dark mode if no preference saved
    setTheme('dark');
  }

  if (btn) {
    btn.addEventListener('click', toggle);
  }
});
