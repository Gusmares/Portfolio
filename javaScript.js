const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const sidebar = document.querySelector('.sidebar');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  mainNav.classList.toggle('active');
  sidebar.classList.toggle('active');
  mobileMenuToggle.innerHTML = mainNav.classList.contains('active') 
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when a link is clicked and scroll to section
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    mainNav.classList.remove('active');
    sidebar.classList.remove('active');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!sidebar.contains(e.target) && mainNav.classList.contains('active')) {
    mainNav.classList.remove('active');
    sidebar.classList.remove('active');
    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  }
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('.animate-on-scroll');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      } else {
        entry.target.classList.remove('animate');
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
});

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

// Decrypting Typing Animation
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

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 500);
});

// ASCII Art Background
const canvas = document.getElementById('ascii-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drops.length = Math.floor(canvas.width / fontSize);
  drops.fill(0);
}

resizeCanvas();

const chars = ['0', '1', '{', '}', '[', ']', '<', '>', '#', '@'];
const fontSize = 12;
const columns = Math.floor(canvas.width / fontSize);
const drops = Array(columns).fill(0);

function drawAscii() {
  ctx.fillStyle = 'rgba(28, 37, 38, 0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = 'rgba(74, 144, 226, 0.3)';
  ctx.font = `${fontSize}px monospace`;
  
  drops.forEach((y, i) => {
    const char = chars[Math.floor(Math.random() * chars.length)];
    const x = i * fontSize;
    ctx.fillText(char, x, y * fontSize);
    
    if (y * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    } else {
      drops[i]++;
    }
  });
}

function animateAscii() {
  drawAscii();
  requestAnimationFrame(animateAscii);
}

animateAscii();

window.addEventListener('resize', resizeCanvas);

// 3D Tilt Effect for Skill Cards
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

// Popup Functionality
function showPopup() {
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  document.body.style.position = 'fixed';
  document.body.style.top = `-${scrollY}px`;
  document.body.style.width = '100%';
  const popup = document.getElementById('popup');
  popup.style.display = 'flex';
}

function closePopup() {
  const popup = document.getElementById('popup');
  const scrollY = parseInt(document.body.style.top || '0', 10);
  document.body.style.position = '';
  document.body.style.top = '';
  document.body.style.width = '';
  window.scrollTo(0, -scrollY);
  popup.style.display = 'none';
}

// Close popup when clicking outside
document.addEventListener('click', (e) => {
  const popup = document.getElementById('popup');
  const popupContent = document.querySelector('.popup-content');
  if (popup.style.display === 'flex' && !popupContent.contains(e.target) && !e.target.classList.contains('demo-btn')) {
    closePopup();
  }
});
