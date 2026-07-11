/**
 * Westlake Pest Control — front-end logic.
 * Reads window.SITE_CONFIG (site-config.js) and renders all
 * config-driven content, plus wires up interactivity:
 * hamburger nav, FAQ accordion, service modals, quote-form
 * validation, WhatsApp message building, theme switching.
 */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG;
  if (!CFG) {
    console.error("site-config.js failed to load — SITE_CONFIG is missing.");
    return;
  }

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, cls, html) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* ---------------------------------------------------------------
   * THEME
   * ------------------------------------------------------------- */
  function applyTheme(themeKey) {
    var theme = CFG.themes[themeKey] || CFG.themes[CFG.activeTheme];
    var root = document.documentElement;
    root.style.setProperty("--bg", theme.bg);
    root.style.setProperty("--bg-alt", theme.bgAlt);
    root.style.setProperty("--surface", theme.surface);
    root.style.setProperty("--border", theme.border);
    root.style.setProperty("--text-primary", theme.textPrimary);
    root.style.setProperty("--text-secondary", theme.textSecondary);
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-2", theme.accent2);
    root.style.setProperty("--accent-contrast", theme.accentContrast);
    root.style.setProperty("--safety", theme.safety);
    root.setAttribute("data-theme-name", themeKey);
    try { localStorage.setItem("wpc-theme", themeKey); } catch (e) { /* storage unavailable */ }
  }

  function initThemeSelector() {
    var saved = null;
    try { saved = localStorage.getItem("wpc-theme"); } catch (e) { /* ignore */ }
    var initial = (saved && CFG.themes[saved]) ? saved : CFG.activeTheme;
    applyTheme(initial);

    var selector = $("#theme-selector");
    if (!selector) return;
    Object.keys(CFG.themes).forEach(function (key) {
      var opt = el("option", null, escapeHtml(CFG.themes[key].label));
      opt.value = key;
      if (key === initial) opt.selected = true;
      selector.appendChild(opt);
    });
    selector.addEventListener("change", function () { applyTheme(selector.value); });
  }

  /* ---------------------------------------------------------------
   * TEXT / ATTRIBUTE BINDINGS  (data-bind="path.to.value")
   * ------------------------------------------------------------- */
  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, key) { return acc && acc[key] !== undefined ? acc[key] : undefined; }, obj);
  }

  function applyBindings() {
    $all("[data-bind]").forEach(function (node) {
      var value = getPath(CFG, node.getAttribute("data-bind"));
      if (value === undefined) return;
      node.textContent = value;
    });
    $all("[data-bind-href]").forEach(function (node) {
      var value = getPath(CFG, node.getAttribute("data-bind-href"));
      if (value === undefined) return;
      node.setAttribute("href", value);
    });
    $all("[data-bind-attr]").forEach(function (node) {
      var spec = node.getAttribute("data-bind-attr").split(":");
      var attr = spec[0], path = spec[1];
      var value = getPath(CFG, path);
      if (value === undefined) return;
      node.setAttribute(attr, value);
    });
  }

  function buildWhatsAppUrl(message) {
    var num = CFG.contact.whatsappNumber.replace(/[^\d]/g, "");
    return "https://wa.me/" + num + (message ? "?text=" + encodeURIComponent(message) : "");
  }

  function wireContactLinks() {
    $all("[data-tel-link]").forEach(function (a) { a.setAttribute("href", "tel:" + CFG.contact.phoneDial); });
    $all("[data-email-link]").forEach(function (a) { a.setAttribute("href", "mailto:" + CFG.contact.email); });
    $all("[data-whatsapp-link]").forEach(function (a) {
      var defaultMsg = "Hi " + CFG.business.name + ", I'd like a quote for pest control service.";
      a.setAttribute("href", buildWhatsAppUrl(defaultMsg));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    var mapFrame = $("#map-embed");
    if (mapFrame) mapFrame.src = CFG.contact.mapEmbedUrl;
  }

  /* ---------------------------------------------------------------
   * RENDER LIST SECTIONS
   * ------------------------------------------------------------- */
  function renderServices() {
    var grid = $("#services-grid");
    if (!grid) return;
    grid.innerHTML = "";
    CFG.services.forEach(function (svc) {
      var card = el("article", "service-card");
      card.innerHTML =
        '<div class="service-icon" aria-hidden="true">' + svc.icon + '</div>' +
        '<h3>' + escapeHtml(svc.name) + '</h3>' +
        '<p class="service-summary">' + escapeHtml(svc.summary) + '</p>' +
        '<p class="service-price">' + escapeHtml(svc.startingPrice) + '</p>' +
        '<button type="button" class="btn-link service-expand" aria-expanded="false">Learn more <span aria-hidden="true">&rarr;</span></button>' +
        '<div class="service-details" hidden>' + escapeHtml(svc.details) + '</div>';
      grid.appendChild(card);
    });
    $all(".service-expand", grid).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var details = btn.nextElementSibling;
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        details.hidden = expanded;
        btn.innerHTML = expanded ? 'Learn more <span aria-hidden="true">&rarr;</span>' : 'Show less <span aria-hidden="true">&uarr;</span>';
      });
    });
  }

  function renderPests() {
    var wrap = $("#pests-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.pestsTreated.forEach(function (pest) {
      wrap.appendChild(el("span", "pest-chip", escapeHtml(pest)));
    });
  }

  function renderServiceAreas() {
    var wrap = $("#service-areas-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.serviceAreas.forEach(function (area) {
      wrap.appendChild(el("li", "area-chip", escapeHtml(area)));
    });
  }

  function renderProcess() {
    var wrap = $("#process-steps");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.process.forEach(function (step) {
      var item = el("div", "process-step");
      item.innerHTML =
        '<div class="process-number">' + step.step + '</div>' +
        '<h3>' + escapeHtml(step.title) + '</h3>' +
        '<p>' + escapeHtml(step.text) + '</p>';
      wrap.appendChild(item);
    });
  }

  function renderTeam() {
    var wrap = $("#team-grid");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.team.forEach(function (member) {
      var card = el("div", "team-card");
      card.innerHTML =
        '<div class="team-avatar" aria-hidden="true">' + escapeHtml(member.name.charAt(0)) + '</div>' +
        '<h3>' + escapeHtml(member.name) + '</h3>' +
        '<p class="team-role">' + escapeHtml(member.role) + '</p>' +
        '<p class="team-bio">' + escapeHtml(member.bio) + '</p>';
      wrap.appendChild(card);
    });
  }

  function renderWhyChooseUs() {
    var wrap = $("#why-us-grid");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.whyChooseUs.forEach(function (item) {
      var card = el("div", "why-card");
      card.innerHTML = '<h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p>';
      wrap.appendChild(card);
    });
  }

  function renderStats() {
    var wrap = $("#stats-grid");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.stats.forEach(function (stat) {
      var card = el("div", "stat-item");
      card.innerHTML = '<h3>' + escapeHtml(stat.value) + '</h3><p>' + escapeHtml(stat.label) + '</p>';
      wrap.appendChild(card);
    });
  }

  function renderTestimonials() {
    var wrap = $("#testimonials-grid");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.testimonials.forEach(function (t) {
      var card = el("figure", "testimonial-card");
      card.innerHTML =
        '<blockquote>&ldquo;' + escapeHtml(t.quote) + '&rdquo;</blockquote>' +
        '<figcaption>' + escapeHtml(t.name) + ', ' + escapeHtml(t.location) + '</figcaption>';
      wrap.appendChild(card);
    });
  }

  function renderFaqs() {
    var wrap = $("#faq-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.faqs.forEach(function (item, i) {
      var wrapper = el("div", "faq-item");
      var btnId = "faq-btn-" + i, panelId = "faq-panel-" + i;
      wrapper.innerHTML =
        '<h3><button type="button" class="faq-question" id="' + btnId + '" aria-expanded="false" aria-controls="' + panelId + '">' +
        escapeHtml(item.q) + '<span class="faq-icon" aria-hidden="true">+</span></button></h3>' +
        '<div class="faq-answer" id="' + panelId + '" role="region" aria-labelledby="' + btnId + '" hidden>' +
        '<p>' + escapeHtml(item.a) + '</p></div>';
      wrap.appendChild(wrapper);
    });
    $all(".faq-question", wrap).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var panel = document.getElementById(btn.getAttribute("aria-controls"));
        var expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        panel.hidden = expanded;
        btn.querySelector(".faq-icon").textContent = expanded ? "+" : "−";
      });
    });
  }

  function renderHours() {
    var wrap = $("#hours-list");
    if (!wrap) return;
    wrap.innerHTML = "";
    CFG.hours.forEach(function (h) {
      var row = el("div", "hours-row");
      row.innerHTML = '<span>' + escapeHtml(h.day) + '</span><span>' + escapeHtml(h.time) + '</span>';
      wrap.appendChild(row);
    });
  }

  /* ---------------------------------------------------------------
   * MOBILE HAMBURGER NAVIGATION
   * ------------------------------------------------------------- */
  function initNav() {
    var toggle = $("#nav-toggle");
    var menu = $("#nav-menu");
    if (!toggle || !menu) return;
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      document.body.classList.toggle("nav-locked", isOpen);
    });
    $all("a", menu).forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-locked");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("nav-open")) {
        menu.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-locked");
        toggle.focus();
      }
    });
  }

  /* ---------------------------------------------------------------
   * QUOTE FORM VALIDATION + WHATSAPP MESSAGE BUILD
   * ------------------------------------------------------------- */
  function initQuoteForm() {
    var form = $("#quote-form");
    if (!form) return;
    var status = $("#quote-form-status");

    function showError(field, message) {
      var errorEl = document.getElementById(field.id + "-error");
      field.setAttribute("aria-invalid", "true");
      if (errorEl) errorEl.textContent = message;
    }
    function clearError(field) {
      var errorEl = document.getElementById(field.id + "-error");
      field.removeAttribute("aria-invalid");
      if (errorEl) errorEl.textContent = "";
    }

    function validate() {
      var valid = true;
      var name = $("#quote-name", form);
      var contactField = $("#quote-contact", form);
      var pest = $("#quote-pest", form);

      if (!name.value.trim()) { showError(name, "Please enter your name."); valid = false; } else clearError(name);

      var contactVal = contactField.value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
      var isPhone = /^[0-9()+\-.\s]{7,}$/.test(contactVal);
      if (!contactVal || (!isEmail && !isPhone)) {
        showError(contactField, "Enter a valid phone number or email address.");
        valid = false;
      } else clearError(contactField);

      if (!pest.value) { showError(pest, "Please select a service."); valid = false; } else clearError(pest);

      return valid;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        status.textContent = "Please correct the highlighted fields.";
        status.className = "form-status form-status-error";
        return;
      }
      var name = $("#quote-name", form).value.trim();
      var contactVal = $("#quote-contact", form).value.trim();
      var pest = $("#quote-pest", form).value;
      var notes = $("#quote-notes", form).value.trim();

      var message = "Hi " + CFG.business.name + ", my name is " + name +
        ". I'd like a quote for: " + pest +
        (notes ? ". Additional details: " + notes : "") +
        ". You can reach me at: " + contactVal + ".";

      status.innerHTML = 'Thanks, ' + escapeHtml(name) + '. Click below to send this request via WhatsApp, or use the phone/email links in the Contact section. ' +
        '<a class="btn-secondary" target="_blank" rel="noopener noreferrer" href="' + buildWhatsAppUrl(message) + '">Send via WhatsApp</a>';
      status.className = "form-status form-status-success";
      form.dataset.lastMessage = message;
    });

    var printBtn = $("#quote-print");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });
  }

  /* ---------------------------------------------------------------
   * SMOOTH SCROLL (respects reduced motion)
   * ------------------------------------------------------------- */
  function initSmoothScroll() {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    $all('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href").slice(1);
        var target = id ? document.getElementById(id) : null;
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      });
    });
  }

  /* ---------------------------------------------------------------
   * ANNOUNCEMENT BAR + EMERGENCY CTA
   * ------------------------------------------------------------- */
  function initEmergencyBar() {
    var bar = $("#announcement-bar");
    if (bar && !CFG.emergency.enabled) bar.hidden = true;
    var emergencyLabel = $("#emergency-label");
    if (emergencyLabel) emergencyLabel.textContent = CFG.emergency.label;
  }

  function setYear() {
    var y = $("#current-year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------------------------------------------------------------
   * INIT
   * ------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initThemeSelector();
    applyBindings();
    wireContactLinks();
    renderServices();
    renderPests();
    renderServiceAreas();
    renderProcess();
    renderTeam();
    renderWhyChooseUs();
    renderStats();
    renderTestimonials();
    renderFaqs();
    renderHours();
    initNav();
    initQuoteForm();
    initSmoothScroll();
    initEmergencyBar();
    setYear();
  });
})();
