/* ==========================================================================
   EDITKARO.IN — SCRIPT.JS
   Vanilla JS only. Sections: DATA → RENDER → FILTER/SEARCH → MODAL →
   NAV/SCROLL → COUNTERS → REVEAL → FORM → MISC
   ========================================================================== */

(() => {
  'use strict';

  /* ============================================================
     1. DATA
     ============================================================ */
  const CATEGORY_LABELS = {
    shortform:   'Short-form Video',
    longform:    'Long-form Video',
    gaming:      'Gaming Video',
    football:    'Football Edit',
    ecommerce:   'eCommerce Ad',
    documentary: 'Documentary Style',
    colorgrade:  'Color Grading',
    anime:       'Anime Video',
    ads:         'Advertisement'
  };

  const VIDEOS = [
    { id: 1,  title: 'Midnight Drop — Reel Cut',          category: 'shortform',   duration: '0:32', seed: 'edit-01', featured: true,  featuredDesc: 'A fashion drop reel edited for maximum retention on Instagram.' },
    { id: 2,  title: 'Founder Story: 60 Seconds',          category: 'shortform',   duration: '0:58', seed: 'edit-02' },
    { id: 3,  title: 'Street Food Diaries Ep. 04',         category: 'longform',    duration: '18:42', seed: 'edit-03', featured: true, featuredDesc: 'A long-form travel documentary series with cinematic color grading.' },
    { id: 4,  title: 'Startup Pitch Recap',                category: 'longform',    duration: '24:10', seed: 'edit-04' },
    { id: 5,  title: 'Ranked Clutch Highlights',           category: 'gaming',      duration: '1:15',  seed: 'edit-05' },
    { id: 6,  title: 'Valorant Montage — Season 6',        category: 'gaming',      duration: '2:04',  seed: 'edit-06' },
    { id: 7,  title: 'Derby Day Best Moments',             category: 'football',    duration: '3:20',  seed: 'edit-07' },
    { id: 8,  title: 'Golazo Compilation — Weekend Edit',  category: 'football',    duration: '1:48',  seed: 'edit-08' },
    { id: 9,  title: 'Festive Sale Product Ad',            category: 'ecommerce',   duration: '0:26',  seed: 'edit-09' },
    { id: 10, title: 'Skincare Unboxing Ad',                category: 'ecommerce',   duration: '0:40',  seed: 'edit-10' },
    { id: 11, title: 'Voices of the Valley',                category: 'documentary', duration: '32:15', seed: 'edit-11', featured: true, featuredDesc: 'An award-style documentary edit exploring craft and culture.' },
    { id: 12, title: 'Life on the Tracks',                  category: 'documentary', duration: '21:08', seed: 'edit-12' },
    { id: 13, title: 'Cinematic Grade — Desert Run',        category: 'colorgrade',  duration: '1:32',  seed: 'edit-13' },
    { id: 14, title: 'Teal & Orange Showreel',              category: 'colorgrade',  duration: '2:12',  seed: 'edit-14' },
    { id: 15, title: 'Shonen Fan Edit — Rising Storm',       category: 'anime',       duration: '1:05',  seed: 'edit-15' },
    { id: 16, title: 'AMV: Neon Nights',                     category: 'anime',       duration: '2:38',  seed: 'edit-16' },
    { id: 17, title: 'App Launch Advertisement',             category: 'ads',         duration: '0:30',  seed: 'edit-17' },
    { id: 18, title: 'Brand Anthem Film',                    category: 'ads',         duration: '1:00',  seed: 'edit-18' }
  ];

  const SERVICES = [
    { icon:'fa-solid fa-film',            title:'Video Editing',          desc:'Precision cuts, pacing and storytelling across short-form and long-form content.' },
    { icon:'fa-solid fa-hashtag',         title:'Social Media Marketing', desc:'Platform-native strategy that turns edits into consistent, compounding reach.' },
    { icon:'fa-solid fa-wand-magic-sparkles', title:'Motion Graphics',    desc:'Kinetic typography, VFX and animated overlays that add polish and punch.' },
    { icon:'fa-solid fa-bullhorn',        title:'Brand Promotions',       desc:'Campaign edits built around a single clear message and a strong call to action.' },
    { icon:'fa-solid fa-droplet',         title:'Color Grading',          desc:'Mood-driven grading that gives every project a consistent, cinematic identity.' },
    { icon:'fa-solid fa-chart-line',      title:'Content Strategy',       desc:'Data-informed planning on formats, hooks and posting cadence that performs.' }
  ];

  const WHY_US = [
    { icon:'fa-solid fa-people-group', title:'Creative Team',      desc:'A dedicated pod of editors and strategists who learn your brand voice.' },
    { icon:'fa-solid fa-bolt',         title:'Fast Delivery',      desc:'Standard turnarounds of 48–72 hours without cutting corners.' },
    { icon:'fa-solid fa-tags',         title:'Affordable Pricing', desc:'Transparent packages built for creators and growing brands alike.' },
    { icon:'fa-solid fa-gem',          title:'High Quality',       desc:'Broadcast-grade editing, grading and sound design on every delivery.' },
    { icon:'fa-solid fa-rotate',       title:'Unlimited Revisions',desc:'We refine until the cut feels exactly right — no extra charge.' },
    { icon:'fa-solid fa-headset',      title:'24/7 Support',       desc:'A real person on chat whenever you need an update or a quick turnaround.' }
  ];

  const TESTIMONIALS = [
    { name:'Ananya Rao',   company:'Founder, Loomé Skincare', review:'Editkaro turned our raw product footage into ads that actually converted. Our ROAS doubled in six weeks.', avatar:34, stars:5 },
    { name:'Vikram Shetty', company:'Creator, 480K subs',      review:'Fast, consistent, and they actually understand pacing for retention. My watch time jumped noticeably.', avatar:15, stars:5 },
    { name:'Priya Menon',  company:'Marketing Lead, Nyra Co.', review:'The color grading alone elevated our brand film. Professional team, zero micromanagement needed.', avatar:47, stars:5 }
  ];

  /* ============================================================
     2. RENDER HELPERS
     ============================================================ */
  const $  = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function thumbUrl(seed, w = 600, h = 375) {
    return `https://picsum.photos/seed/${seed}/${w}/${h}`;
  }

  function renderPortfolio(list) {
    const grid = $('#portfolioGrid');
    const noResults = $('#noResults');
    const meta = $('#resultsMeta');

    grid.innerHTML = '';

    if (!list.length) {
      noResults.hidden = false;
    } else {
      noResults.hidden = true;
      list.forEach(v => grid.appendChild(buildVideoCard(v)));
    }

    meta.textContent = `Showing ${list.length} of ${VIDEOS.length} projects`;
  }

  function buildVideoCard(v) {
    const card = document.createElement('article');
    card.className = 'video-card reveal-up in-view';
    card.dataset.id = v.id;
    card.innerHTML = `
      <div class="video-thumb">
        <img src="${thumbUrl(v.seed)}" alt="${v.title} thumbnail" loading="lazy">
        <span class="video-badge">${CATEGORY_LABELS[v.category]}</span>
        <span class="video-duration"><i class="fa-regular fa-clock"></i> ${v.duration}</span>
        <div class="video-play-overlay"><i class="fa-solid fa-play"></i></div>
      </div>
      <div class="video-info">
        <h4>${v.title}</h4>
        <span>${CATEGORY_LABELS[v.category]} · ${v.duration}</span>
      </div>
    `;
    card.addEventListener('click', () => openModal(v));
    return card;
  }

  function renderFeatured() {
    const grid = $('#featuredGrid');
    grid.innerHTML = '';
    VIDEOS.filter(v => v.featured).forEach(v => {
      const el = document.createElement('article');
      el.className = 'featured-card reveal-up';
      el.innerHTML = `
        <img src="${thumbUrl(v.seed, 700, 875)}" alt="${v.title}" loading="lazy">
        <div class="featured-overlay">
          <span class="featured-tag">${CATEGORY_LABELS[v.category]}</span>
          <h3>${v.title}</h3>
          <p>${v.featuredDesc || ''}</p>
        </div>
        <div class="featured-play"><i class="fa-solid fa-play"></i></div>
      `;
      el.addEventListener('click', () => openModal(v));
      grid.appendChild(el);
    });
  }

  function renderServices() {
    const grid = $('#servicesGrid');
    grid.innerHTML = SERVICES.map(s => `
      <div class="service-card glass-card reveal-up">
        <div class="service-icon"><i class="${s.icon}"></i></div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('');
  }

  function renderWhyUs() {
    const grid = $('#whyGrid');
    grid.innerHTML = WHY_US.map(w => `
      <div class="why-card glass-card reveal-up">
        <div class="why-icon"><i class="${w.icon}"></i></div>
        <div>
          <h4>${w.title}</h4>
          <p>${w.desc}</p>
        </div>
      </div>
    `).join('');
  }

  function renderTestimonials() {
    const grid = $('#testimonialGrid');
    grid.innerHTML = TESTIMONIALS.map(t => `
      <div class="testimonial-card glass-card reveal-up">
        <div class="stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</div>
        <p class="review">"${t.review}"</p>
        <div class="testimonial-person">
          <img src="https://i.pravatar.cc/88?img=${t.avatar}" alt="${t.name}" loading="lazy">
          <div>
            <h5>${t.name}</h5>
            <span>${t.company}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  /* ============================================================
     3. FILTER + SEARCH
     ============================================================ */
  let activeFilter = 'all';
  let searchTerm = '';

  function applyFilters() {
    let list = VIDEOS;
    if (activeFilter !== 'all') list = list.filter(v => v.category === activeFilter);
    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      list = list.filter(v => v.title.toLowerCase().includes(q));
    }
    renderPortfolio(list);
  }

  function initFilters() {
    const filterBar = $('#filterBar');
    filterBar.addEventListener('click', e => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;
      $$('.filter-btn', filterBar).forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  }

  function initSearch() {
    const input = $('#searchInput');
    const clearBtn = $('#clearSearch');

    input.addEventListener('input', () => {
      searchTerm = input.value;
      clearBtn.classList.toggle('show', searchTerm.length > 0);
      applyFilters();
    });

    clearBtn.addEventListener('click', () => {
      input.value = '';
      searchTerm = '';
      clearBtn.classList.remove('show');
      applyFilters();
      input.focus();
    });
  }

  /* ============================================================
     4. VIDEO MODAL / LIGHTBOX
     ============================================================ */
  const modal = $('#videoModal');

  function openModal(video) {
    $('#modalThumb').src = thumbUrl(video.seed, 900, 506);
    $('#modalThumb').alt = video.title;
    $('#modalBadge').textContent = CATEGORY_LABELS[video.category];
    $('#modalTitle').textContent = video.title;
    $('#modalDuration').innerHTML = `<i class="fa-regular fa-clock"></i> ${video.duration}`;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function initModal() {
    $('#modalClose').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });
  }

  /* ============================================================
     5. NAVIGATION — sticky, mobile menu, active section
     ============================================================ */
  function initNavbar() {
    const navbar = $('#navbar');
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function initMobileMenu() {
    const hamburger = $('#hamburger');
    const menu = $('#mobileMenu');

    hamburger.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    $$('a', menu).forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }));
  }

  function initActiveSection() {
    const sections = $$('main section[id]');
    const navLinks = $$('.nav-link');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

    sections.forEach(sec => observer.observe(sec));
  }

  /* ============================================================
     6. SCROLL PROGRESS + BACK TO TOP
     ============================================================ */
  function initScrollProgress() {
    const bar = $('#scrollProgress');
    const backToTop = $('#backToTop');

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
      backToTop.classList.toggle('show', scrollTop > 500);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ============================================================
     7. ANIMATED COUNTERS
     ============================================================ */
  function initCounters() {
    const counters = $$('.stat-num');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /* ============================================================
     8. SCROLL REVEAL (fade-in / slide-up)
     ============================================================ */
  function initScrollReveal() {
    const targets = $$('.reveal-up');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    targets.forEach(t => observer.observe(t));
  }

  /* ============================================================
     9. CONTACT FORM VALIDATION
     ============================================================ */
  function initForm() {
    const form = $('#contactForm');
    const successMsg = $('#formSuccess');

    const validators = {
      name: v => v.trim().length >= 2 || 'Please enter your full name.',
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email address.',
      phone: v => /^[\d+\s()-]{7,}$/.test(v) || 'Enter a valid phone number.',
      projectType: v => v !== '' || 'Please select a project type.',
      message: v => v.trim().length >= 10 || 'Message should be at least 10 characters.'
    };

    function validateField(field) {
      const value = field.value;
      const rule = validators[field.name];
      const group = field.closest('.form-group');
      const errorEl = form.querySelector(`[data-error-for="${field.name}"]`);
      if (!rule) return true;

      const result = rule(value);
      if (result === true) {
        group.classList.remove('error');
        errorEl.textContent = '';
        return true;
      } else {
        group.classList.add('error');
        errorEl.textContent = result;
        return false;
      }
    }

    Object.keys(validators).forEach(name => {
      const field = form.elements[name];
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => {
        if (field.closest('.form-group').classList.contains('error')) validateField(field);
      });
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      Object.keys(validators).forEach(name => {
        if (!validateField(form.elements[name])) valid = false;
      });

      if (!valid) {
        successMsg.hidden = true;
        return;
      }

      // Simulate send (no backend wired up)
      successMsg.hidden = false;
      form.reset();
      setTimeout(() => { successMsg.hidden = true; }, 6000);
    });
  }

  /* ============================================================
     10. BUTTON RIPPLE EFFECT
     ============================================================ */
  function initRipple() {
    $$('.btn-ripple').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.className = 'ripple';
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
      });
    });
  }

  /* ============================================================
     11. LOADER
     ============================================================ */
  function initLoader() {
    window.addEventListener('load', () => {
      setTimeout(() => $('#loader').classList.add('hidden'), 400);
    });
    // fallback in case 'load' already fired
    if (document.readyState === 'complete') {
      setTimeout(() => $('#loader').classList.add('hidden'), 400);
    }
  }

  /* ============================================================
     12. MISC (year, smooth anchor close for mobile, etc.)
     ============================================================ */
  function initMisc() {
    $('#year').textContent = new Date().getFullYear();
  }

  /* ============================================================
     INIT
     ============================================================ */
  document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    renderPortfolio(VIDEOS);
    renderServices();
    renderWhyUs();
    renderTestimonials();

    initFilters();
    initSearch();
    initModal();
    initNavbar();
    initMobileMenu();
    initActiveSection();
    initScrollProgress();
    initCounters();
    initScrollReveal();
    initForm();
    initRipple();
    initMisc();
  });

  initLoader();

})();
