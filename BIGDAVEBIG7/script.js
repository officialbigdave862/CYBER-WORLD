const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const themeToggle = document.getElementById('themeToggle');

menuToggle?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
mainNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  if (menuToggle) menuToggle.textContent = '☰';
}));

const savedTheme = localStorage.getItem('bigdave-theme');
if (savedTheme === 'light') document.body.classList.add('light-theme');
function updateThemeLabel() {
  if (themeToggle) themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '☾ <span>Dark / Light</span>' : '☼ <span>Light / Dark</span>';
}
updateThemeLabel();
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('bigdave-theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
  updateThemeLabel();
});
document.getElementById('year').textContent = new Date().getFullYear();

const form = document.getElementById('contactForm');
form?.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent(`Portfolio enquiry: ${data.get('service')}`);
  const body = encodeURIComponent(
    `Hello BIGDAVEBIG 7,\n\nMy name is ${data.get('name')}.\nMy email: ${data.get('email')}\nService needed: ${data.get('service')}\n\nProject details:\n${data.get('message')}\n\nThank you.`
  );
  window.location.href = `mailto:officialbigdave862@gmail.com?subject=${subject}&body=${body}`;
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('#mainNav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
      }
    });
  }, {rootMargin: '-35% 0px -55% 0px'});
  sections.forEach(section => observer.observe(section));
}
