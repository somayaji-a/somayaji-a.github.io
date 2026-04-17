/* =============================================
   Neural Network Canvas Animation
   ============================================= */

(function () {
  var canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H, particles, mouse;
  var COUNT = 80;
  var MAX_DIST = 160;

  mouse = { x: -1000, y: -1000 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    return {
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r:  Math.random() * 1.8 + 0.8,
      hue: Math.random() < 0.65 ? 195 : 265   // cyan : violet
    };
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < COUNT; i++) particles.push(makeParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    /* connections */
    for (var i = 0; i < particles.length; i++) {
      var a = particles[i];
      for (var j = i + 1; j < particles.length; j++) {
        var b = particles[j];
        var dx = a.x - b.x, dy = a.y - b.y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < MAX_DIST) {
          var alpha = (1 - d / MAX_DIST) * 0.35;
          // blend hue between the two particles
          var h = Math.round((a.hue + b.hue) / 2);
          ctx.strokeStyle = 'hsla(' + h + ', 90%, 65%, ' + alpha + ')';
          ctx.lineWidth   = 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    /* particles */
    for (var k = 0; k < particles.length; k++) {
      var p = particles[k];

      /* subtle mouse attraction */
      var mdx = mouse.x - p.x, mdy = mouse.y - p.y;
      var md  = Math.sqrt(mdx * mdx + mdy * mdy);
      if (md < 200) {
        p.vx += (mdx / md) * 0.015;
        p.vy += (mdy / md) * 0.015;
      }

      /* speed cap */
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 0.8) { p.vx = (p.vx / speed) * 0.8; p.vy = (p.vy / speed) * 0.8; }

      p.x += p.vx;
      p.y += p.vy;

      /* wrap edges */
      if (p.x < -10)  p.x = W + 10;
      if (p.x > W+10) p.x = -10;
      if (p.y < -10)  p.y = H + 10;
      if (p.y > H+10) p.y = -10;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'hsla(' + p.hue + ', 90%, 70%, 0.7)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', function () {
    resize();
  });

  window.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  init();
  draw();
}());


/* =============================================
   Navbar — add .scrolled class on scroll
   ============================================= */

(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}());


/* =============================================
   Mobile nav toggle
   ============================================= */

(function () {
  var toggle = document.getElementById('nav-toggle');
  var links  = document.getElementById('nav-links');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    var open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  /* close on link click */
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });
}());


/* =============================================
   AOS init
   ============================================= */

AOS.init({
  once: true,
  duration: 700,
  offset: 60,
  easing: 'ease-out-cubic'
});
