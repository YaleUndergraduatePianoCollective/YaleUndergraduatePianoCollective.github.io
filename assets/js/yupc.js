/* YUPC site behaviour: nav, home intro, scroll reveals, lazy YouTube, sliders. */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Nav ---- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.nav__burger');
  function onScroll() { if (nav) nav.classList.toggle('is-scrolled', window.scrollY > 40); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  if (burger) burger.addEventListener('click', function () { document.body.classList.toggle('menu-open'); });
  document.querySelectorAll('.menu a').forEach(function (a) { a.addEventListener('click', function () { document.body.classList.remove('menu-open'); }); });

  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav__links a').forEach(function (a) {
    if ((a.getAttribute('href') || '').toLowerCase() === here) a.classList.add('is-active');
  });

  /* ---- Home intro sequence ----
     navy → logo fades in → welcome text pops up above it → nav + scroll cue appear.
     Plays at full length the first time in a browser session, faster afterwards. */
  var intro = document.querySelector('.intro');
  if (intro) {
    var seen = false;
    try { seen = sessionStorage.getItem('yupc-intro') === '1'; sessionStorage.setItem('yupc-intro', '1'); } catch (e) {}
    var k = (seen || reduce) ? 0.25 : 1;
    setTimeout(function () { intro.classList.add('is-logo'); }, 500 * k);
    setTimeout(function () { intro.classList.add('is-text'); }, 2400 * k);
    setTimeout(function () { intro.classList.add('is-ready'); document.body.classList.add('intro-done'); }, 3100 * k);
  }

  /* ---- Scroll to #hash targets on arrival (e.g. about.html#board) ---- */
  if (location.hash) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) window.addEventListener('load', function () { setTimeout(function () { target.scrollIntoView({ behavior: 'instant', block: 'start' }); }, 50); });
  }

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---- Lazy YouTube: <div class="yt" data-id="VIDEO_ID"></div> ---- */
  document.querySelectorAll('.yt[data-id]').forEach(function (box) {
    var id = box.getAttribute('data-id');
    var img = document.createElement('img');
    img.src = 'https://i.ytimg.com/vi/' + id + '/hqdefault.jpg';
    img.alt = box.getAttribute('data-title') || '';
    img.loading = 'lazy';
    box.appendChild(img);
    box.addEventListener('click', function () {
      if (box.classList.contains('is-playing')) return;
      var f = document.createElement('iframe');
      f.src = 'https://www.youtube.com/embed/' + id + '?autoplay=1&rel=0';
      f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      f.allowFullscreen = true;
      box.innerHTML = ''; box.appendChild(f); box.classList.add('is-playing');
    });
  });

  /* ---- Guest photos: if the file isn't there yet, show initials instead ---- */
  document.querySelectorAll('img[data-initials]').forEach(function (img) {
    function swap() {
      var ph = document.createElement('div');
      ph.className = 'guest__ph'; ph.textContent = img.getAttribute('data-initials');
      img.replaceWith(ph);
    }
    if (img.complete && img.naturalWidth === 0) swap();   // already failed before we got here
    else img.addEventListener('error', swap);
  });

  /* ---- Simple sliders: .slider > .slider__viewport > .slider__track > img ---- */
  document.querySelectorAll('.slider').forEach(function (s) {
    var track = s.querySelector('.slider__track'), slides = track.children, cap = s.querySelector('.slider__cap'), i = 0;
    function go(n) {
      i = (n + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + i * 100 + '%)';
      if (cap) cap.textContent = slides[i].getAttribute('alt') || '';
    }
    s.querySelector('.slider__btn--prev').addEventListener('click', function () { go(i - 1); });
    s.querySelector('.slider__btn--next').addEventListener('click', function () { go(i + 1); });
    go(0);
  });
})();
