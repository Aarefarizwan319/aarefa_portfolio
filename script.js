// Theme toggle with persistence
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'light'){ document.body.classList.add('light'); }
themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{ threshold: 0.2 });
revealEls.forEach(el => io.observe(el));

// Contact form validation (basic)
const form = document.getElementById('contactForm');
const statusEl = document.getElementById('formStatus');
function setError(input, msg){
  input.nextElementSibling.textContent = msg || '';
}
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  let ok = true;
  const name = form.name;
  const email = form.email;
  const message = form.message;

  if(!name.value.trim()){ setError(name, 'Please enter your name'); ok = false; } else setError(name, '');
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ setError(email, 'Enter a valid email'); ok = false; } else setError(email, '');
  if(message.value.trim().length < 10){ setError(message, 'Message should be at least 10 characters'); ok = false; } else setError(message, '');

  if(ok){
    statusEl.textContent = 'Thanks! Your message has been validated locally (demo). Connect this form to your email service.';
    form.reset();
  } else {
    statusEl.textContent = 'Please fix the errors above.';
  }
});

// Download resume (placeholder file generated on the fly)
document.getElementById('downloadResumeBtn')?.addEventListener('click', () => {
  const content = `Aarefa Rizwan\nFront-End Developer\n\nThis is a placeholder resume. Replace this with your actual PDF later.`;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Aarefa_Rizwan_Resume.txt';
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(url);
  a.remove();
});