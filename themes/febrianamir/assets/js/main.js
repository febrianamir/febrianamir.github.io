document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const toggle = () => {
    body.classList.toggle('dark');
    localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  };

  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  } else {
    body.classList.remove('dark');
  }

  const btn = document.getElementById('header-theme-toggle');
  if (btn) btn.addEventListener('click', toggle);
});
