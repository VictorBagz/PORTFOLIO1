// Preloader
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  preloader.style.opacity = '0';
  setTimeout(() => preloader.remove(), 500);
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Theme Toggle
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('light-theme');
  localStorage.setItem('theme', body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Load saved theme
if (localStorage.getItem('theme') === 'light') {
  body.classList.add('light-theme');
  themeSwitch.checked = true;
}

// Scroll Spy
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});

// Scroll to Top
const scrollTop = document.querySelector('.scroll-top');
window.addEventListener('scroll', () => {
  scrollTop.classList.toggle('visible', window.scrollY > 300);
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section
gsap.from('.hero-content h1', { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from('.hero-content p', { opacity: 0, y: 50, duration: 1, delay: 0.7 });
gsap.from('.cta-button', { opacity: 0, y: 50, duration: 1, delay: 0.9 });

// About Section
gsap.from('#about h2', {
  scrollTrigger: '#about',
  opacity: 0,
  y: 50,
  duration: 1
});
gsap.from('.about-content', {
  scrollTrigger: '#about',
  opacity: 0,
  x: -50,
  duration: 1,
  delay: 0.2
});
gsap.from('.skill-item', {
  scrollTrigger: '.skills',
  opacity: 0,
  scale: 0.8,
  stagger: 0.2,
  duration: 0.5
});

// Projects Section
gsap.from('.project-card', {
  scrollTrigger: '#projects',
  opacity: 0,
  x: (i, el) => (i % 2 === 0 ? -100 : 100),
  stagger: 0.3,
  duration: 1
});

// Services Section
gsap.from('.service-item', {
  scrollTrigger: '#services',
  opacity: 0,
  y: 50,
  stagger: 0.3,
  duration: 1
});

// Testimonials Section
gsap.from('.testimonial-item', {
  scrollTrigger: '#testimonials',
  opacity: 0,
  x: -50,
  stagger: 0.3,
  duration: 1
});

// Contact Section
gsap.from('#contact h2', {
  scrollTrigger: '#contact',
  opacity: 0,
  y: 50,
  duration: 1
});
gsap.from('#contact-form, .contact-info', {
  scrollTrigger: '#contact',
  opacity: 0,
  x: (i, el) => (el.id === 'contact-form' ? -50 : 50),
  duration: 1,
  delay: 0.2
});

// Footer
gsap.from('footer', {
  scrollTrigger: 'footer',
  opacity: 0,
  y: 50,
  duration: 1
});

// Contact Form (Placeholder)
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Message sent! (This is a placeholder action)');
  contactForm.reset();
});

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const particleCount = 100;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

animateParticles();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
