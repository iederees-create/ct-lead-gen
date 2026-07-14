/**
 * Precision Laser Works — front-end logic.
 * Reads window.SITE_CONFIG (site-config.js), renders all config-driven
 * content, and wires up interactivity: hamburger nav, FAQ accordion,
 * service cards, quote-form validation, theme switching, and the Laser
 * Cut & Engraving Quote Planner (calculations delegated to the pure
 * functions in planner.js).
 */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG;
  var Planner = window.LaserQuotePlanner;
  if (!CFG) { console.error("site-config.js failed to load — SITE_CONFIG is missing."); return; }
  if (!Planner) { console.error("planner.js failed to load — LaserQuotePlanner is missing."); return; }

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
    root.style.setProperty("--blueprint-line", theme.blueprintLine || "rgba(255,255,255,0.08)");
    root.setAttribute("data-theme-name", themeKey);
    try { localStorage.setItem("plw-theme", themeKey); } catch (e) { /* storage unavailable */ }
  }

  function initThemeSelector() {
    var saved = null;
    try { saved = localStorage.getItem("plw-theme"); } catch (e) { /* ignore */ }
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
  }

  function wireContactLinks() {
    $all("[data-tel-link]").forEach(function (a) { a.setAttribute("href", "tel:" + CFG.contact.phoneDial); });
    $all("[data-email-link]").forEach(function (a) { a.setAttribute("href", "mailto:" + CFG.contact.email); });
    $all("[data-whatsapp-link][data-whatsapp-default]").forEach(function (a) {
      var defaultMsg = "Hi " + CFG.business.name + ", I'd like a quote for a laser cutting/engraving project.";
      a.setAttribute("href", Planner.buildWhatsAppUrl(CFG.contact.whatsappNumber, defaultMsg));
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener noreferrer");
    });
    var mapFrame = $("#map-embed");
    if (mapFrame) mapFrame.src = CFG.contact.mapEmbedUrl;
  }

  /* ---------------------------------------------------------------
   * RENDER LIST SECTIONS
   * ------------------------------------------------------------- */
  function renderTrustIndicators() {
    var wrap = $("#trust-indicators-grid");
    if (!wrap || !CFG.trustIndicators) return;
    wrap.innerHTML = "";
    CFG.trustIndicators.forEach(function (item) {
      var card = el("div", "trust-bar-item");
      card.innerHTML = '<span class="trust-bar-icon" aria-hidden="true">' + item.icon + '</span><span>' + escapeHtml(item.label) + '</span>';
      wrap.appendChild(card);
    });
  }

  function renderServices() {
    var grid = $("#services-grid");
    var jump = $("#services-jump");
    if (!grid) return;
    grid.innerHTML = "";
    if (jump) jump.innerHTML = "";
    CFG.services.forEach(function (svc) {
      if (jump) {
        var chip = el("a", "service-jump-chip", escapeHtml(svc.name));
        chip.href = "#" + svc.id;
        jump.appendChild(chip);
      }
      var card = el("article", "service-card");
      card.id = svc.id;
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

  function renderMaterials() {
    var wrap = $("#materials-grid");
    var order = CFG.planner && CFG.planner.materialOrder;
    var materials = CFG.planner && CFG.planner.materials;
    if (!wrap || !order || !materials) return;
    wrap.innerHTML = "";
    order.forEach(function (key) {
      var mat = materials[key];
      if (!mat) return;
      var card = el("div", "material-card");
      card.innerHTML =
        '<div class="material-icon" aria-hidden="true">' + mat.icon + '</div>' +
        '<h3>' + escapeHtml(mat.label) + '</h3>' +
        '<p>' + escapeHtml(mat.description) + '</p>';
      wrap.appendChild(card);
    });
  }

  function renderFilePrepGuidance() {
    var wrap = $("#file-prep-grid");
    if (!wrap || !CFG.filePrepGuidance) return;
    wrap.innerHTML = "";
    CFG.filePrepGuidance.forEach(function (item) {
      var card = el("div", "file-prep-card");
      card.innerHTML = '<h3>' + escapeHtml(item.title) + '</h3><p>' + escapeHtml(item.text) + '</p>';
      wrap.appendChild(card);
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

  function renderGallery() {
    var wrap = $("#gallery-grid");
    if (!wrap || !CFG.gallery) return;
    wrap.innerHTML = "";
    CFG.gallery.forEach(function (item) {
      var card = el("figure", "gallery-card");
      if (item.image) {
        card.innerHTML = '<img src="' + escapeHtml(item.image) + '" alt="' + escapeHtml(item.title) + '" loading="lazy" width="640" height="480">';
      } else {
        card.innerHTML =
          '<div class="gallery-placeholder" aria-hidden="true"><span>' + escapeHtml(item.category) + '</span></div>' +
          '<div class="gallery-placeholder-label">Replace with a real project photo</div>';
      }
      card.innerHTML += '<figcaption>' + escapeHtml(item.title) + '</figcaption>';
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

  function populateServiceTypeSelect(select) {
    if (!select || !CFG.planner) return;
    CFG.planner.serviceTypeOrder.forEach(function (key) {
      var typeCfg = CFG.planner.serviceTypes[key];
      if (!typeCfg) return;
      var opt = el("option", null, escapeHtml(typeCfg.label));
      opt.value = key;
      select.appendChild(opt);
    });
  }

  function populateMaterialSelect(select) {
    if (!select || !CFG.planner) return;
    CFG.planner.materialOrder.forEach(function (key) {
      var matCfg = CFG.planner.materials[key];
      if (!matCfg) return;
      var opt = el("option", null, escapeHtml(matCfg.label));
      opt.value = key;
      select.appendChild(opt);
    });
  }

  function populateSuburbList() {
    var list = $("#planner-suburb-list");
    if (!list) return;
    CFG.serviceAreas.forEach(function (area) {
      var opt = el("option", null, "");
      opt.value = area;
      list.appendChild(opt);
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
   * ANNOUNCEMENT BAR
   * ------------------------------------------------------------- */
  function initAnnouncementBar() {
    var bar = $("#announcement-bar");
    if (!bar) return;
    if (!CFG.announcement || !CFG.announcement.enabled) { bar.hidden = true; return; }
    var label = $("#announcement-label");
    var cta = $("#announcement-cta");
    if (label) label.textContent = CFG.announcement.label;
    if (cta) {
      cta.textContent = CFG.announcement.ctaText || "Learn more";
      cta.setAttribute("href", CFG.announcement.ctaHref || "#planner");
    }
  }

  /* ---------------------------------------------------------------
   * EXPLICIT-CONFIRMATION PANEL
   * Shared by the Planner and the Quote form for any message that
   * embeds visitor-entered personal data before it is sent out.
   * ------------------------------------------------------------- */
  var confirmState = { onConfirm: null, triggerEl: null };

  function openConfirmPanel(message, onConfirm, triggerEl) {
    var panel = $("#planner-confirm-panel");
    var textarea = $("#planner-confirm-message");
    if (!panel || !textarea) { onConfirm(); return; } // fallback if panel missing
    textarea.value = message;
    panel.hidden = false;
    confirmState.onConfirm = onConfirm;
    confirmState.triggerEl = triggerEl || null;
    textarea.focus();
  }

  function closeConfirmPanel() {
    var panel = $("#planner-confirm-panel");
    if (!panel) return;
    panel.hidden = true;
    confirmState.onConfirm = null;
    if (confirmState.triggerEl) confirmState.triggerEl.focus();
    confirmState.triggerEl = null;
  }

  function initConfirmPanel() {
    var sendBtn = $("#planner-confirm-send");
    var cancelBtn = $("#planner-confirm-cancel");
    if (sendBtn) sendBtn.addEventListener("click", function () {
      var fn = confirmState.onConfirm;
      closeConfirmPanel();
      if (fn) fn();
    });
    if (cancelBtn) cancelBtn.addEventListener("click", closeConfirmPanel);
    document.addEventListener("keydown", function (e) {
      var panel = $("#planner-confirm-panel");
      if (panel && !panel.hidden && e.key === "Escape") closeConfirmPanel();
    });
  }

  /* ---------------------------------------------------------------
   * LASER CUT & ENGRAVING QUOTE PLANNER — UI WIRING
   * ------------------------------------------------------------- */
  var lastPlannerResult = null;
  var lastPlannerInput = null;

  function readPlannerForm() {
    var form = $("#planner-form");
    var data = Planner.defaultInput();
    var formData = new FormData(form);
    Object.keys(data).forEach(function (key) {
      if (typeof data[key] === "boolean") {
        data[key] = form.elements[key] ? form.elements[key].checked : false;
      } else if (formData.has(key)) {
        data[key] = formData.get(key);
      }
    });
    return data;
  }

  function writePlannerForm(input) {
    var form = $("#planner-form");
    Object.keys(input).forEach(function (key) {
      var field = form.elements[key];
      if (!field) return;
      if (typeof input[key] === "boolean") field.checked = input[key];
      else field.value = input[key];
    });
  }

  function formatArea(area) {
    if (!area) return "Not enough information provided — add width, height and units.";
    return area.cm2 + " cm²" + (area.cm2 >= 1000 ? " (" + area.m2 + " m²)" : "") + " per piece";
  }

  function renderPlannerResults(input, result) {
    $("#result-area").textContent = formatArea(result.area);
    $("#result-quantity").textContent = result.quantity ? String(result.quantity) : "Not specified";

    $("#result-complexity").textContent = result.complexity.level + (result.complexity.reasons.length ? " — " + result.complexity.reasons.join(", ") : "");

    var budgetEl = $("#result-budget");
    if (!result.budget || result.budget.enabled === false) {
      budgetEl.textContent = "Budget estimates are disabled for this demo — contact us for a custom quotation.";
    } else if (!result.budget.computable) {
      budgetEl.textContent = result.budget.reason;
    } else {
      budgetEl.textContent = Planner.formatCurrency(result.budget.min, result.budget.currency) + " – " + Planner.formatCurrency(result.budget.max, result.budget.currency) +
        " (includes " + result.budget.contingencyPercent + "% contingency on the upper figure)";
    }

    var warningEl = $("#planner-design-warning");
    if (result.designSupport.warning) {
      warningEl.hidden = false;
      warningEl.textContent = result.designSupport.message;
    } else {
      warningEl.hidden = true;
      warningEl.textContent = "";
    }

    function fillList(id, items, render) {
      var ul = $(id);
      ul.innerHTML = "";
      if (!items.length) { ul.appendChild(el("li", "empty-list-item", "None")); return; }
      items.forEach(function (item) { ul.appendChild(el("li", null, render(item))); });
    }

    fillList("#result-service-checklist", result.serviceChecklist, function (t) { return escapeHtml(t); });
    fillList("#result-file-checklist", result.filePrepChecklist, function (t) { return escapeHtml(t); });
    fillList("#result-missing", result.missingInfo, function (m) { return escapeHtml(m); });
    fillList("#result-assumptions", result.assumptions, function (a) { return escapeHtml(a); });

    $("#result-next-step").textContent = result.nextStep;
    $("#result-summary-text").value = result.summary;

    $("#planner-results").hidden = false;
    $("#planner-results").scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  }

  function validatePlannerInput(input) {
    var errorEl = $("#planner-service-type-error");
    if (!input.serviceType) {
      errorEl.textContent = "Please select a service type to continue.";
      $("#planner-service-type").setAttribute("aria-invalid", "true");
      return false;
    }
    errorEl.textContent = "";
    $("#planner-service-type").removeAttribute("aria-invalid");
    return true;
  }

  function initPlanner() {
    var form = $("#planner-form");
    if (!form) return;

    populateServiceTypeSelect($("#planner-service-type"));
    populateMaterialSelect($("#planner-material"));
    populateSuburbList();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = readPlannerForm();
      var status = $("#planner-form-status");
      if (!validatePlannerInput(input)) {
        status.textContent = "Please correct the highlighted field.";
        status.className = "form-status form-status-error";
        return;
      }
      status.textContent = "";
      var result = Planner.runPlanner(input, CFG.planner, CFG.business);
      lastPlannerInput = input;
      lastPlannerResult = result;
      renderPlannerResults(input, result);
    });

    $("#planner-reset").addEventListener("click", function () {
      writePlannerForm(Planner.resetInput());
      $("#planner-results").hidden = true;
      $("#planner-form-status").textContent = "";
      $("#planner-action-status").textContent = "";
      lastPlannerInput = null;
      lastPlannerResult = null;
    });

    function requireResult() {
      if (!lastPlannerResult) {
        $("#planner-action-status").textContent = "Calculate a quote first.";
        $("#planner-action-status").className = "form-status form-status-error";
        return false;
      }
      return true;
    }

    $("#action-copy").addEventListener("click", function () {
      if (!requireResult()) return;
      var text = $("#result-summary-text").value;
      var status = $("#planner-action-status");
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          status.textContent = "Summary copied to clipboard.";
          status.className = "form-status form-status-success";
        }, function () {
          status.textContent = "Could not copy automatically — select the text in the summary box and copy manually.";
          status.className = "form-status form-status-error";
        });
      } else {
        var textarea = $("#result-summary-text");
        textarea.select();
        status.textContent = "Summary selected — press Ctrl/Cmd+C to copy.";
        status.className = "form-status form-status-success";
      }
    });

    $("#action-print").addEventListener("click", function () {
      if (!requireResult()) return;
      document.body.classList.add("printing-planner-summary");
      window.print();
      window.setTimeout(function () { document.body.classList.remove("printing-planner-summary"); }, 500);
    });

    $("#action-download").addEventListener("click", function () {
      if (!requireResult()) return;
      var text = $("#result-summary-text").value;
      var blob = new Blob([text], { type: "text/plain" });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = (lastPlannerInput.projectName || "laser-quote-summary").replace(/[^a-z0-9\-]+/gi, "-") + ".txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      $("#planner-action-status").textContent = "Summary downloaded.";
      $("#planner-action-status").className = "form-status form-status-success";
    });

    $("#action-whatsapp").addEventListener("click", function (e) {
      if (!requireResult()) return;
      var message = lastPlannerResult.summary;
      openConfirmPanel(message, function () {
        window.open(Planner.buildWhatsAppUrl(CFG.contact.whatsappNumber, message), "_blank", "noopener,noreferrer");
        $("#planner-action-status").textContent = "WhatsApp opened with your quote request.";
        $("#planner-action-status").className = "form-status form-status-success";
      }, e.currentTarget);
    });

    $("#action-email").addEventListener("click", function (e) {
      if (!requireResult()) return;
      var message = lastPlannerResult.summary;
      openConfirmPanel(message, function () {
        window.location.href = Planner.buildEmailUrl(CFG.contact.email, "Quote Request — " + (lastPlannerInput.projectName || lastPlannerResult.serviceTypeLabel), message);
        $("#planner-action-status").textContent = "Your email app should now be open with the quote request.";
        $("#planner-action-status").className = "form-status form-status-success";
      }, e.currentTarget);
    });
  }

  /* ---------------------------------------------------------------
   * QUOTE FORM VALIDATION + EXPLICIT-CONFIRM SEND
   * ------------------------------------------------------------- */
  function initQuoteForm() {
    var form = $("#quote-form");
    if (!form) return;
    var status = $("#quote-form-status");
    populateServiceTypeSelect($("#quote-service-type"));

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
      var serviceType = $("#quote-service-type", form);

      if (!name.value.trim()) { showError(name, "Please enter your name."); valid = false; } else clearError(name);

      var contactVal = contactField.value.trim();
      var isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactVal);
      var isPhone = /^[0-9()+\-.\s]{7,}$/.test(contactVal);
      if (!contactVal || (!isEmail && !isPhone)) {
        showError(contactField, "Enter a valid phone number or email address.");
        valid = false;
      } else clearError(contactField);

      if (!serviceType.value) { showError(serviceType, "Please select a service type."); valid = false; } else clearError(serviceType);

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
      var serviceType = $("#quote-service-type", form).value;
      var notes = $("#quote-notes", form).value.trim();

      var message = "Hi " + CFG.business.name + ", my name is " + name +
        ". I'd like a quote for: " + serviceType +
        (notes ? ". Additional details: " + notes : "") +
        ". You can reach me at: " + contactVal + ".";

      status.textContent = "Review the message below, then confirm to send.";
      status.className = "form-status form-status-success";

      openConfirmPanel(message, function () {
        window.open(Planner.buildWhatsAppUrl(CFG.contact.whatsappNumber, message), "_blank", "noopener,noreferrer");
        status.textContent = "Thanks, " + name + " — WhatsApp opened with your quote request.";
      }, form.querySelector("button[type=submit]"));
    });
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
    renderTrustIndicators();
    renderServices();
    renderMaterials();
    renderFilePrepGuidance();
    renderProcess();
    renderGallery();
    renderServiceAreas();
    renderFaqs();
    renderHours();
    initNav();
    initAnnouncementBar();
    initConfirmPanel();
    initPlanner();
    initQuoteForm();
    initSmoothScroll();
    setYear();
  });
})();
