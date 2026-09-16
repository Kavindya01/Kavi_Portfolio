// This form currently opens the user's mail app with the message pre-filled.
// To send messages without opening a mail client, wire this up to EmailJS:
// https://www.emailjs.com/docs/sdk/installation/
document.getElementById('contact-form').addEventListener('submit', function(e){
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  const subject = encodeURIComponent('Portfolio contact from ' + name);
  const body = encodeURIComponent(message + '\n\nFrom: ' + name + ' (' + email + ')');
  window.location.href = 'mailto:lbksewwandi13@gmail.com?subject=' + subject + '&body=' + body;
});

// Nav active-state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#site-nav a');
window.addEventListener('scroll', () => {
  let current = sections[0].id;
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// Lightweight starfield background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = document.body.scrollHeight;
  const count = Math.floor((canvas.width * canvas.height) / 9000);
  stars = Array.from({length: count}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.3 + 0.2,
    a: Math.random() * 0.6 + 0.2,
    speed: Math.random() * 0.15 + 0.02
  }));
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#ffffff';
  stars.forEach(s => {
    ctx.globalAlpha = s.a;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
    if(!reduceMotion){
      s.y += s.speed;
      if (s.y > canvas.height) s.y = 0;
    }
  });
  ctx.globalAlpha = 1;
  if(!reduceMotion) requestAnimationFrame(draw);
}

window.addEventListener('resize', resize);
resize();
draw();