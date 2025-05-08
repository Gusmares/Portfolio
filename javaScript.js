const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const sidebar = document.querySelector('.sidebar');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  mainNav.classList.toggle('active');
  sidebar.classList.toggle('active');
  mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
    ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    mainNav.classList.remove('active');
    sidebar.classList.remove('active');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    const targetId = link.getAttribute('href').substring(1);
    document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
    sidebar.classList.remove('active');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('animate', entry.isIntersecting);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Name Animation
document.addEventListener('DOMContentLoaded', () => {
  const nameElement = document.getElementById('name-animation');
  const nameText = nameElement.textContent;
  nameElement.innerHTML = '';
  nameText.split('').forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.opacity = '0';
    span.style.letterSpacing = '5px';
    span.style.display = 'inline-block';
    span.style.transition = `opacity 0.3s ease ${index * 0.1}s, letter-spacing 0.3s ease ${index * 0.1}s`;
    nameElement.appendChild(span);
  });
  setTimeout(() => {
    nameElement.querySelectorAll('span').forEach(span => {
      span.style.opacity = '1';
      span.style.letterSpacing = '1px';
    });
  }, 500);
});

// Typing Animation
const typedText = document.getElementById('typed-text');
const textToType = "Oi, eu sou Gustavo! Bem-vindo ao meu universo digital.";
let index = 0;

function type() {
  if (index < textToType.length) {
    typedText.textContent += textToType.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}

document.addEventListener('DOMContentLoaded', () => setTimeout(type, 500));

// ASCII Background
const canvas = document.getElementById('ascii-bg');
const ctx = canvas.getContext('2d');
const chars = ['0', '1', '{', '}', '[', ']', '<', '>', '#', '@'];
const fontSize = 12;
let drops = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops = Array(Math.floor(canvas.width / fontSize)).fill(0);
}

resizeCanvas();

function drawAscii() {
  ctx.fillStyle = 'rgba(28, 37, 38, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(74, 144, 226, 0.3)';
  ctx.font = `${fontSize}px monospace`;
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillText(char, i * fontSize, y * fontSize);
    drops[i] = (y * fontSize > canvas.height && Math.random() > 0.975) ? 0 : y + 1;
  });
}

function animateAscii() {
  drawAscii();
  requestAnimationFrame(animateAscii);
}

animateAscii();
window.addEventListener('resize', resizeCanvas);

// 3D Tilt Effect
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });
});

// Popup
function showPopup() {
  const scrollY = window.pageYOffset;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  const scrollY = parseInt(document.body.style.top || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, -scrollY);
  document.getElementById('popup').style.display = 'none';
}

document.addEventListener('click', (e) => {
  const popup = document.getElementById('popup');
  const popupContent = document.querySelector('.popup-content');
  if (popup.style.display === 'flex' && !popupContent.contains(e.target) && !e.target.classList.contains('demo-btn')) {
    closePopup();
  }
});
