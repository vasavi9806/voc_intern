/* ==========================================================================
   EDITKARO.IN — portfolio grid, category filters and preview modal
   ========================================================================== */
(function () {
  "use strict";

  var grid = document.querySelector("[data-reel-grid]");
  var filterBar = document.querySelector("[data-filter-bar]");
  var countEl = document.querySelector("[data-reel-count]");
  if (!grid || !window.EK_PROJECTS) return;

  var THUMB_COLORS = ["#ff4b2b", "#ffc93c", "#2b6dff", "#22b573", "#a25bff", "#ff7ab8"];

  function thumbGradient(seed) {
    var sum = 0;
    for (var i = 0; i < seed.length; i++) sum += seed.charCodeAt(i);
    var a = THUMB_COLORS[sum % THUMB_COLORS.length];
    var b = THUMB_COLORS[(sum + 3) % THUMB_COLORS.length];
    return "linear-gradient(155deg, " + a + " 0%, " + b + " 100%)";
  }

  function projectCard(p) {
    var catLabel = (window.EK_CATEGORIES.find(function (c) { return c.slug === p.category; }) || {}).label || p.category;
    var el = document.createElement("article");
    el.className = "reel-card" + (p.aspect === "wide" ? " wide" : "");
    el.setAttribute("data-category", p.category);
    el.setAttribute("tabindex", "0");
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", "Preview " + p.title);
    el.innerHTML =
      '<div class="reel-thumb" style="position:absolute;inset:0;background:' + thumbGradient(p.seed) + '"></div>' +
      '<div class="play-btn" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>' +
      "</div>" +
      '<div class="overlay">' +
      '<span class="cat-tag">' + catLabel + "</span>" +
      "<h4>" + p.title + "</h4>" +
      "</div>";
    el.addEventListener("click", function () { openModal(p, catLabel); });
    el.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); openModal(p, catLabel); }
    });
    return el;
  }

  function render(filter) {
    grid.innerHTML = "";
    var items = window.EK_PROJECTS.filter(function (p) { return filter === "all" || p.category === filter; });
    items.forEach(function (p) { grid.appendChild(projectCard(p)); });
    if (countEl) {
      countEl.textContent = items.length + (items.length === 1 ? " edit" : " edits") +
        (filter === "all" ? " across every category" : " in this category");
    }
  }

  // Build filter chips
  if (filterBar) {
    var chips = [{ slug: "all", label: "All Work" }].concat(window.EK_CATEGORIES);
    chips.forEach(function (c, idx) {
      var btn = document.createElement("button");
      btn.className = "filter-chip";
      btn.type = "button";
      btn.textContent = c.label;
      btn.setAttribute("aria-pressed", idx === 0 ? "true" : "false");
      btn.addEventListener("click", function () {
        filterBar.querySelectorAll(".filter-chip").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        render(c.slug);
        history.replaceState(null, "", c.slug === "all" ? location.pathname : "#" + c.slug);
      });
      filterBar.appendChild(btn);
    });

    var initial = location.hash ? location.hash.replace("#", "") : "all";
    var initialChip = Array.prototype.find.call(filterBar.children, function (b) {
      return b.textContent === (window.EK_CATEGORIES.find(function (c) { return c.slug === initial; }) || {}).label;
    });
    if (initialChip) {
      filterBar.querySelectorAll(".filter-chip").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      initialChip.setAttribute("aria-pressed", "true");
      render(initial);
    } else {
      render("all");
    }
  } else {
    render("all");
  }

  // Modal
  var backdrop = document.querySelector("[data-modal]");
  var modalVideo = backdrop ? backdrop.querySelector(".modal-video") : null;
  var modalTitle = backdrop ? backdrop.querySelector("[data-modal-title]") : null;
  var modalCat = backdrop ? backdrop.querySelector("[data-modal-cat]") : null;
  var modalClient = backdrop ? backdrop.querySelector("[data-modal-client]") : null;
  var closeBtn = backdrop ? backdrop.querySelector(".modal-close") : null;
  var lastFocused = null;

  function openModal(p, catLabel) {
    if (!backdrop) return;
    lastFocused = document.activeElement;
    modalVideo.innerHTML = '<iframe src="https://www.youtube.com/embed/' + p.video +
      '?rel=0" title="' + p.title + '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
    modalTitle.textContent = p.title;
    modalCat.textContent = catLabel;
    modalClient.textContent = "Client: " + p.client;
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    if (!backdrop) return;
    backdrop.classList.remove("open");
    modalVideo.innerHTML = "";
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  if (backdrop) {
    closeBtn.addEventListener("click", closeModal);
    backdrop.addEventListener("click", function (e) { if (e.target === backdrop) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }
})();
