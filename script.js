// ===========================
// Dr. YM Dental — script.js
// ===========================

// --- Navbar toggle (mobile) ---
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

// --- Price tabs ---
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.price-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.querySelector(`.price-panel[data-panel="${tab}"]`);
    if (panel) panel.classList.add('active');
  });
});

// --- Cases tabs ---
document.querySelectorAll('.case-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;
    document.querySelectorAll('.case-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.cases-grid').forEach(g => g.classList.remove('active'));
    tab.classList.add('active');
    const grid = document.querySelector(`.cases-grid[data-cat="${cat}"]`);
    if (grid) grid.classList.add('active');
  });
});

// --- Scroll navbar shadow ---
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.style.boxShadow = '0 4px 32px rgba(26,95,212,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 20px rgba(26,95,212,0.06)';
  }
});

// --- Map switcher ---
function switchMap(lat, lng, label) {
  const iframe = document.getElementById('clinicMap');
  if (!iframe) return;

  // Update iframe src with new coords
  const src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2skz!4v1700000000000!5m2!1sru!2skz`;
  iframe.src = src;

  // Update active button
  document.querySelectorAll('.map-pin-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes(label.split(' ')[0])) {
      btn.classList.add('active');
    }
  });
}

// --- Scroll reveal ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.adv-card, .service-card, .case-card, .review-card, .branch-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = `opacity 0.55s ease ${(i % 3) * 0.08}s, transform 0.55s ease ${(i % 3) * 0.08}s, border-color 0.3s ease, box-shadow 0.3s ease`;
  observer.observe(el);
});

document.addEventListener('animationend', () => {});

// Add revealed class handler
const style = document.createElement('style');
style.textContent = `.revealed { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);