/**
 * Surface Cleaning Estimate Planner & Quote Builder
 * ============================================================
 * Original interactive tool for the Hydro Clean template.
 *
 * Exposes two things on window.SurfacePlanner:
 *   - calc: pure, dependency-free calculation functions (unit
 *     conversion, area, complexity adjustment, time estimate,
 *     summary text). These are unit-tested directly from Node —
 *     see tests/planner.test.js — and are also usable via
 *     `require()` in a CommonJS test runner because of the export
 *     shim at the bottom of this file.
 *   - ui: the accessible multi-step wizard that mounts into
 *     #surface-planner-app and calls into `calc`.
 *
 * IMPORTANT: this tool produces PRELIMINARY PLANNING ESTIMATES
 * ONLY. It does not calculate a binding labour quote, and it does
 * not claim time/coverage rates are universally exact. See
 * site-config.js `planner.surfaceTypes` and
 * `legal.measurementDisclaimer`.
 * ============================================================
 */
(function (root) {
  "use strict";

  /* =================================================================
   * CALC — pure functions, no DOM access
   * ================================================================= */
  var UNIT_TO_M = { m: 1, cm: 0.01, ft: 0.3048, in: 0.0254 };

  function isFiniteNumber(n) {
    return typeof n === "number" && isFinite(n) && !isNaN(n);
  }

  /** Parses a raw string/number measurement. Returns {value, error}. */
  function validateDimension(raw, fieldLabel) {
    var label = fieldLabel || "Value";
    if (raw === "" || raw === null || raw === undefined) {
      return { value: null, error: label + " is required." };
    }
    var n = typeof raw === "number" ? raw : parseFloat(raw);
    if (!isFiniteNumber(n)) {
      return { value: null, error: label + " must be a number." };
    }
    if (n <= 0) {
      return { value: null, error: label + " must be greater than zero." };
    }
    return { value: n, error: null };
  }

  /** Converts a positive length value from `unit` to metres. */
  function toMeters(value, unit) {
    var factor = UNIT_TO_M[unit];
    if (!isFiniteNumber(value) || value <= 0 || !factor) return null;
    return value * factor;
  }

  /**
   * Calculates the area (m²) of one measurement entry.
   * entry: { length, width, count, unit }
   * Returns { area, errors[] } — area is null if any required
   * dimension is invalid; errors lists human-readable problems.
   */
  function calcEntryArea(entry) {
    var errors = [];
    var lengthV = validateDimension(entry.length, "Length");
    var widthV = validateDimension(entry.width, "Width");
    var countRaw = entry.count === undefined || entry.count === "" ? 1 : entry.count;
    var count = typeof countRaw === "number" ? countRaw : parseFloat(countRaw);
    if (!isFiniteNumber(count) || count <= 0) {
      errors.push("Number of identical areas must be a positive whole number.");
      count = null;
    } else {
      count = Math.floor(count);
    }
    if (lengthV.error) errors.push(lengthV.error);
    if (widthV.error) errors.push(widthV.error);

    if (lengthV.value === null || widthV.value === null || count === null) {
      return { area: null, errors: errors };
    }

    var lengthM = toMeters(lengthV.value, entry.unit);
    var widthM = toMeters(widthV.value, entry.unit);
    if (lengthM === null || widthM === null) {
      errors.push("Unrecognised unit of measurement.");
      return { area: null, errors: errors };
    }

    var area = lengthM * widthM * count;
    if (!isFiniteNumber(area) || area <= 0) {
      return { area: null, errors: ["Calculated area is invalid — check the entered dimensions."] };
    }
    return { area: area, errors: errors };
  }

  /**
   * Sums an array of measurement entries.
   * Returns { total (m², never negative/NaN), perEntry: [{area, errors}], hasErrors }
   */
  function sumAreas(entries) {
    var perEntry = (entries || []).map(calcEntryArea);
    var hasErrors = perEntry.some(function (e) { return e.errors.length > 0; });
    var total = perEntry.reduce(function (sum, e) { return sum + (e.area || 0); }, 0);
    if (!isFiniteNumber(total) || total < 0) total = 0;
    return { total: total, perEntry: perEntry, hasErrors: hasErrors };
  }

  /** Applies a complexity adjustment percentage (e.g. 15 for +15%) to an area. Never negative. */
  function applyAdjustment(areaM2, adjustmentPercent) {
    if (!isFiniteNumber(areaM2) || areaM2 < 0) return 0;
    var pct = isFiniteNumber(adjustmentPercent) && adjustmentPercent >= 0 ? adjustmentPercent : 0;
    var result = areaM2 * (1 + pct / 100);
    return isFiniteNumber(result) && result >= 0 ? result : areaM2;
  }

  /** Looks up a named option (by id) in a config array of {id, ...}. Returns null if not found/configured. */
  function findOption(list, id) {
    if (!Array.isArray(list) || !id) return null;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  /**
   * Combined complexity adjustment (%) from the selected condition level
   * and access level. Each contributes its configured timeMultiplier;
   * unrecognised/unselected levels contribute 0. Never negative.
   */
  function calcComplexityPercent(conditionLevelId, accessLevelId, cfg) {
    var conditionOpt = findOption(cfg && cfg.conditionLevels, conditionLevelId);
    var accessOpt = findOption(cfg && cfg.accessLevels, accessLevelId);
    var conditionPct = conditionOpt && isFiniteNumber(conditionOpt.timeMultiplier) ? conditionOpt.timeMultiplier : 0;
    var accessPct = accessOpt && isFiniteNumber(accessOpt.timeMultiplier) ? accessOpt.timeMultiplier : 0;
    var total = conditionPct + accessPct;
    return total >= 0 ? total : 0;
  }

  /**
   * Estimated cleaning time in hours, rounded up to the nearest half
   * hour with a sensible minimum. Returns null when no coverage rate
   * is configured for the selected surface type (unknown, not zero).
   */
  function calcTimeEstimateHours(adjustedAreaM2, coverageRatePerHourM2) {
    if (!isFiniteNumber(adjustedAreaM2) || adjustedAreaM2 <= 0) return 0;
    if (!isFiniteNumber(coverageRatePerHourM2) || coverageRatePerHourM2 <= 0) return null;
    var hours = adjustedAreaM2 / coverageRatePerHourM2;
    var rounded = Math.ceil(hours * 2) / 2;
    return isFiniteNumber(rounded) && rounded > 0 ? Math.max(rounded, 0.5) : 0.5;
  }

  /**
   * Estimated cost. Prefers an hourly rate (rate × estimated hours),
   * falls back to a per-m² rate. Returns null when no pricing was
   * supplied or the time estimate is unavailable.
   */
  function calcCostEstimate(estimatedHours, adjustedAreaM2, pricePerHour, pricePerSqm) {
    var hourRate = validateDimension(pricePerHour, "Price per hour");
    if (hourRate.value !== null && isFiniteNumber(estimatedHours) && estimatedHours > 0) {
      return round2(hourRate.value * estimatedHours);
    }
    var sqmRate = validateDimension(pricePerSqm, "Price per m²");
    if (sqmRate.value !== null && isFiniteNumber(adjustedAreaM2) && adjustedAreaM2 >= 0) {
      return round2(sqmRate.value * adjustedAreaM2);
    }
    return null;
  }

  function round2(n) {
    return isFiniteNumber(n) ? Math.round(n * 100) / 100 : null;
  }

  /** Human-readable list of what's still missing for an accurate quote. */
  function calcMissingInfo(state, results, cfg) {
    var missing = [];
    if (!state.projectType) missing.push("Project type not selected.");
    if (results.totalAreaM2 <= 0) missing.push("No valid area measurements entered yet.");
    if (!state.surfaceType) missing.push("Surface type not selected.");
    if (!state.conditionLevel) missing.push("Soiling/condition level not selected.");
    if (!state.accessLevel) missing.push("Access difficulty not selected.");
    if (state.surfaceType && results.estimatedHours === null) {
      missing.push("No time-per-m² rate configured for this surface type — estimated duration unavailable.");
    }
    if (results.costEstimate === null) missing.push("No pricing provided — cost estimate unavailable.");
    if (state.accessLevel === "restricted" || state.accessLevel === "multi-storey") {
      missing.push("Access is limited or elevated — a site visit is recommended before a firm quote.");
    }
    if (state.conditionLevel === "severe") {
      missing.push("Severe soiling noted — method and time may need on-site confirmation.");
    }
    if (state.conditions && state.conditions.fragileSurface) {
      missing.push("Fragile/delicate surface flagged — cleaning method needs confirming before work begins.");
    }
    return missing;
  }

  /** Runs the full calculation pipeline from a planner state object. */
  function computeResults(state, cfg) {
    var areaSum = sumAreas(state.areas);
    var totalAreaM2 = areaSum.total;
    var adjustmentPercent = calcComplexityPercent(state.conditionLevel, state.accessLevel, cfg);
    var adjustedAreaM2 = applyAdjustment(totalAreaM2, adjustmentPercent);
    var surfaceOpt = findOption(cfg && cfg.surfaceTypes, state.surfaceType);
    var coverageRate = surfaceOpt && isFiniteNumber(surfaceOpt.coverageRatePerHourM2) ? surfaceOpt.coverageRatePerHourM2 : null;
    var estimatedHours = coverageRate !== null ? calcTimeEstimateHours(adjustedAreaM2, coverageRate) : null;
    var costEstimate = calcCostEstimate(estimatedHours, adjustedAreaM2, state.pricePerHour, state.pricePerSqm);

    var results = {
      totalAreaM2: round2(totalAreaM2),
      adjustmentPercent: adjustmentPercent,
      adjustedAreaM2: round2(adjustedAreaM2),
      estimatedHours: estimatedHours,
      costEstimate: costEstimate,
      areaErrors: areaSum.hasErrors,
      perEntry: areaSum.perEntry
    };
    results.missing = calcMissingInfo(state, results, cfg);
    return results;
  }

  /** Builds the plain-text structured summary shared across all handoff actions. */
  function buildSummaryText(state, results, cfg) {
    var lines = [];
    var currency = (cfg && cfg.currencySymbol) || "$";
    lines.push("SURFACE CLEANING ESTIMATE PLANNER SUMMARY");
    lines.push("Project type: " + (state.projectType || "Not specified"));
    lines.push("Area mode: " + (state.areaMode || "Not specified"));
    lines.push("");
    lines.push("Measurements (" + state.unit + "):");
    (state.areas || []).forEach(function (a, i) {
      lines.push("  " + (a.label || "Area " + (i + 1)) + ": " + a.length + " x " + a.width + " " + state.unit + ", qty " + (a.count || 1));
    });
    lines.push("");
    lines.push("Total measured area: " + (results.totalAreaM2 || 0) + " m2");

    var surfaceOpt = findOption(cfg && cfg.surfaceTypes, state.surfaceType);
    var conditionOpt = findOption(cfg && cfg.conditionLevels, state.conditionLevel);
    var accessOpt = findOption(cfg && cfg.accessLevels, state.accessLevel);
    lines.push("Surface type: " + (surfaceOpt ? surfaceOpt.label : "Not specified"));
    lines.push("Soiling/condition: " + (conditionOpt ? conditionOpt.label : "Not specified"));
    lines.push("Access: " + (accessOpt ? accessOpt.label : "Not specified"));
    lines.push("Complexity adjustment: " + results.adjustmentPercent + "%");
    lines.push("Adjusted coverage area: " + (results.adjustedAreaM2 || 0) + " m2");
    lines.push("Estimated cleaning time: " + (results.estimatedHours === null ? "Unknown (site assessment recommended)" : results.estimatedHours + " hour(s)"));
    if (results.costEstimate !== null) lines.push("Estimated cost: " + currency + results.costEstimate);

    var conditionLabels = [];
    var CONDITION_TEXT = {
      fragileSurface: "Fragile/delicate surface — low-pressure method needed",
      heavyMoldAlgae: "Heavy mould/algae growth",
      petsOrPlantsNearby: "Pets or plants nearby — chemical sensitivity",
      gutterDebris: "Gutters have heavy debris",
      gatedAccess: "Gated/secure property — access code or key needed",
      occupied: "Property occupied during service",
      biohazard: "Biohazard or pet waste present",
      photosAvailable: "Photos available to share",
      helpChoosingMethod: "Help choosing a cleaning method requested"
    };
    Object.keys(state.conditions || {}).forEach(function (key) {
      if (state.conditions[key] && CONDITION_TEXT[key]) conditionLabels.push(CONDITION_TEXT[key]);
    });
    if (conditionLabels.length) { lines.push(""); lines.push("Site conditions: " + conditionLabels.join(", ")); }

    if (state.contact) {
      lines.push("");
      lines.push("Contact: " + (state.contact.name || "-"));
      lines.push("Phone/email: " + (state.contact.phone || state.contact.email || "-"));
      lines.push("Suburb: " + (state.contact.suburb || "-"));
      lines.push("Preferred timeframe: " + (state.contact.timeframe || "-"));
      lines.push("Preferred contact method: " + (state.contact.method || "-"));
      if (state.contact.notes) lines.push("Notes: " + state.contact.notes);
    }
    if (results.missing && results.missing.length) {
      lines.push("");
      lines.push("Still needed for a firm quote:");
      results.missing.forEach(function (m) { lines.push("  - " + m); });
    }
    lines.push("");
    lines.push("This is a preliminary planning estimate only, not a binding quote. Actual time and cost vary by surface condition, access, weather and site conditions.");
    return lines.join("\n");
  }

  var calc = {
    UNIT_TO_M: UNIT_TO_M,
    validateDimension: validateDimension,
    toMeters: toMeters,
    calcEntryArea: calcEntryArea,
    sumAreas: sumAreas,
    applyAdjustment: applyAdjustment,
    findOption: findOption,
    calcComplexityPercent: calcComplexityPercent,
    calcTimeEstimateHours: calcTimeEstimateHours,
    calcCostEstimate: calcCostEstimate,
    calcMissingInfo: calcMissingInfo,
    computeResults: computeResults,
    buildSummaryText: buildSummaryText,
    round2: round2
  };

  /* =================================================================
   * UI — only runs in a browser with a #surface-planner-app mount point
   * ================================================================= */
  function initUI() {
    var CFG = root.SITE_CONFIG;
    var mount = document.getElementById("surface-planner-app");
    if (!mount || !CFG) return;

    var STEPS = ["type", "areas", "surface", "conditions", "estimate", "contact"];
    var STEP_LABELS = { type: "Project", areas: "Measure", surface: "Surface", conditions: "Site", estimate: "Estimate", contact: "Send" };
    var STORAGE_KEY = "hydroclean-planner-state-v1";

    function defaultState() {
      return {
        step: 0,
        projectType: "",
        areaMode: "single",
        unit: (CFG.planner && CFG.planner.unitDefault) || "m",
        areas: [{ id: 1, label: "Area 1", length: "", width: "", count: 1, unit: (CFG.planner && CFG.planner.unitDefault) || "m" }],
        surfaceType: "",
        conditionLevel: "",
        accessLevel: "",
        pricePerHour: "",
        pricePerSqm: "",
        conditions: {
          fragileSurface: false, heavyMoldAlgae: false, petsOrPlantsNearby: false,
          gutterDebris: false, gatedAccess: false, occupied: false,
          biohazard: false, photosAvailable: false, helpChoosingMethod: false
        },
        contact: { name: "", phone: "", email: "", suburb: "", method: "whatsapp", notes: "", timeframe: "" },
        saveProgress: false,
        nextAreaId: 2
      };
    }

    var state = defaultState();
    var restoredNotice = false;

    try {
      var savedFlag = localStorage.getItem(STORAGE_KEY + "-consent");
      if (savedFlag === "true") {
        var saved = localStorage.getItem(STORAGE_KEY);
        if (saved) { state = JSON.parse(saved); state.saveProgress = true; restoredNotice = true; }
      }
    } catch (e) { /* storage unavailable — proceed with defaults */ }

    function persist() {
      try {
        if (state.saveProgress) {
          localStorage.setItem(STORAGE_KEY + "-consent", "true");
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } else {
          localStorage.removeItem(STORAGE_KEY + "-consent");
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) { /* storage unavailable — silently skip persistence */ }
    }

    function escapeHtml(str) {
      return String(str).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    function buildWhatsAppUrl(message) {
      var num = CFG.contact.whatsappNumber.replace(/[^\d]/g, "");
      return "https://wa.me/" + num + (message ? "?text=" + encodeURIComponent(message) : "");
    }

    /* ---------------- Skeleton (rendered once) ---------------- */
    mount.innerHTML =
      '<div class="planner-app" role="region" aria-label="Surface Cleaning Estimate Planner">' +
      '  <div class="planner-field" style="margin-bottom:1.25rem;">' +
      '    <label style="display:flex;align-items:center;gap:0.5rem;font-weight:600;font-size:0.85rem;">' +
      '      <input type="checkbox" id="planner-save-consent"> Save my progress in this browser (optional — off by default)' +
      '    </label>' +
      '  </div>' +
      '  <ol class="planner-steps" id="planner-step-indicator"></ol>' +
      '  <div class="planner-panel" id="planner-panel" tabindex="-1"></div>' +
      '  <p class="planner-live-region" id="planner-live" role="status" aria-live="polite"></p>' +
      '</div>';

    var stepIndicator = mount.querySelector("#planner-step-indicator");
    var panel = mount.querySelector("#planner-panel");
    var liveRegion = mount.querySelector("#planner-live");
    var saveConsentBox = mount.querySelector("#planner-save-consent");
    saveConsentBox.checked = !!state.saveProgress;
    saveConsentBox.addEventListener("change", function () {
      state.saveProgress = saveConsentBox.checked;
      if (!state.saveProgress) { try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(STORAGE_KEY + "-consent"); } catch (e) {} }
      else persist();
    });

    function announce(msg) { liveRegion.textContent = msg; }

    function renderStepIndicator() {
      stepIndicator.innerHTML = STEPS.map(function (key, i) {
        var cls = "planner-step-dot" + (i === state.step ? " is-active" : "") + (i < state.step ? " is-done" : "");
        return '<li class="' + cls + '"' + (i === state.step ? ' aria-current="step"' : "") + '>' + (i + 1) + ". " + STEP_LABELS[key] + "</li>";
      }).join("");
    }

    /* ---------------- Step renderers ---------------- */
    function renderType() {
      var types = CFG.projectTypes || [];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 1 of 6 — Project Type</h3>' +
        '<p class="planner-panel-intro">What are you having cleaned?</p>' +
        '<div class="planner-option-grid" role="group" aria-labelledby="planner-panel-heading">' +
        types.map(function (t) {
          return '<button type="button" class="planner-option-card' + (state.projectType === t ? " is-selected" : "") +
            '" data-action="set-type" data-value="' + escapeHtml(t) + '" aria-pressed="' + (state.projectType === t) + '">' + escapeHtml(t) + "</button>";
        }).join("") + "</div>" +
        '<p class="planner-field-error" id="type-error"></p>';
    }

    function renderAreas() {
      var modes = [
        { id: "single", label: "Single area" }, { id: "multiple", label: "Multiple areas" },
        { id: "walls", label: "Vertical surfaces (siding/walls)" }, { id: "floor-plus-walls", label: "Ground + vertical combined" }
      ];
      var isWallMode = state.areaMode === "walls";
      var secondDimLabel = isWallMode ? "Height" : "Width";
      var html =
        '<h3 id="planner-panel-heading">Step 2 of 6 — Measurements</h3>' +
        '<p class="planner-panel-intro">Choose how you want to measure, then enter each area.' +
        (state.areaMode === "floor-plus-walls" ? ' For vertical entries, enter the height in the second dimension field.' : '') + '</p>' +
        '<div class="planner-option-grid" role="group" aria-label="Area mode" style="margin-bottom:1.5rem;">' +
        modes.map(function (m) {
          return '<button type="button" class="planner-option-card' + (state.areaMode === m.id ? " is-selected" : "") +
            '" data-action="set-area-mode" data-value="' + m.id + '" aria-pressed="' + (state.areaMode === m.id) + '">' + m.label + "</button>";
        }).join("") + "</div>" +
        '<div class="planner-field" style="max-width:200px;margin-bottom:1.25rem;">' +
        '<label for="unit-select">Unit of measurement</label>' +
        '<select id="unit-select" data-action="set-unit">' +
        ["m", "cm", "ft", "in"].map(function (u) { return '<option value="' + u + '"' + (state.unit === u ? " selected" : "") + ">" + u + "</option>"; }).join("") +
        "</select></div>";

      state.areas.forEach(function (area, i) {
        html += '<div class="planner-area-card"><div class="planner-area-card-head"><strong>' + escapeHtml(area.label || "Area " + (i + 1)) + "</strong>" +
          (state.areas.length > 1 ? '<button type="button" class="planner-remove-area" data-action="remove-area" data-id="' + area.id + '">Remove</button>' : "") +
          "</div>" +
          '<div class="planner-field-grid">' +
          '<div class="planner-field"><label for="area-label-' + area.id + '">Label</label><input type="text" id="area-label-' + area.id + '" data-action="area-field" data-field="label" data-id="' + area.id + '" value="' + escapeHtml(area.label) + '"></div>' +
          '<div class="planner-field"><label for="area-length-' + area.id + '">Length (' + state.unit + ')</label><input type="number" min="0" step="any" id="area-length-' + area.id + '" data-action="area-field" data-field="length" data-id="' + area.id + '" value="' + escapeHtml(area.length) + '" aria-describedby="area-length-error-' + area.id + '"></div>' +
          '<div class="planner-field"><label for="area-width-' + area.id + '">' + secondDimLabel + ' (' + state.unit + ')</label><input type="number" min="0" step="any" id="area-width-' + area.id + '" data-action="area-field" data-field="width" data-id="' + area.id + '" value="' + escapeHtml(area.width) + '"></div>' +
          '<div class="planner-field"><label for="area-count-' + area.id + '">Identical areas</label><input type="number" min="1" step="1" id="area-count-' + area.id + '" data-action="area-field" data-field="count" data-id="' + area.id + '" value="' + escapeHtml(area.count) + '"></div>' +
          "</div>" +
          '<p class="planner-field-error" id="area-length-error-' + area.id + '"></p>' +
          "</div>";
      });
      html += '<button type="button" class="btn-secondary planner-add-area" data-action="add-area">+ Add another area</button>';
      panel.innerHTML = html;
    }

    function renderSurface() {
      var surfaceTypes = (CFG.planner && CFG.planner.surfaceTypes) || [];
      var conditionLevels = (CFG.planner && CFG.planner.conditionLevels) || [];
      var accessLevels = (CFG.planner && CFG.planner.accessLevels) || [];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 3 of 6 — Surface &amp; Access</h3>' +
        '<p class="planner-panel-intro">Tell us what surface it is, how soiled it is, and how easy it is to reach. Pricing fields are optional.</p>' +
        '<h4>Surface type</h4>' +
        '<div class="planner-option-grid" role="group" aria-label="Surface type">' +
        surfaceTypes.map(function (s) {
          return '<button type="button" class="planner-option-card' + (state.surfaceType === s.id ? " is-selected" : "") +
            '" data-action="set-surface-type" data-value="' + s.id + '" aria-pressed="' + (state.surfaceType === s.id) + '">' + escapeHtml(s.label) + "</button>";
        }).join("") + "</div>" +
        '<h4 style="margin-top:1.5rem;">Soiling / condition</h4>' +
        '<div class="planner-option-grid" role="group" aria-label="Soiling or condition level">' +
        conditionLevels.map(function (c) {
          return '<button type="button" class="planner-option-card' + (state.conditionLevel === c.id ? " is-selected" : "") +
            '" data-action="set-condition-level" data-value="' + c.id + '" aria-pressed="' + (state.conditionLevel === c.id) + '">' + escapeHtml(c.label) + "</button>";
        }).join("") + "</div>" +
        '<h4 style="margin-top:1.5rem;">Access</h4>' +
        '<div class="planner-option-grid" role="group" aria-label="Access difficulty">' +
        accessLevels.map(function (a) {
          return '<button type="button" class="planner-option-card' + (state.accessLevel === a.id ? " is-selected" : "") +
            '" data-action="set-access-level" data-value="' + a.id + '" aria-pressed="' + (state.accessLevel === a.id) + '">' + escapeHtml(a.label) + "</button>";
        }).join("") + "</div>" +
        '<h4 style="margin-top:1.5rem;">Pricing (optional)</h4>' +
        '<div class="planner-field-grid">' +
        field("price-per-hour", "Your price per hour", state.pricePerHour, "pricePerHour") +
        field("price-per-sqm", "Your price per m² (optional)", state.pricePerSqm, "pricePerSqm") +
        "</div>" +
        '<p class="planner-field-hint">Leave pricing blank to skip a cost estimate — only your quote is binding.</p>';
    }

    function field(id, label, value, key) {
      return '<div class="planner-field"><label for="' + id + '">' + label + '</label>' +
        '<input type="number" min="0" step="any" id="' + id + '" data-action="set-field" data-field="' + key + '" value="' + escapeHtml(value) + '"></div>';
    }

    function renderConditions() {
      var CONDITION_LABELS = [
        ["fragileSurface", "Fragile or delicate surface (needs a low-pressure/soft-wash method)"],
        ["heavyMoldAlgae", "Heavy mould, algae or moss growth"],
        ["petsOrPlantsNearby", "Pets or plants nearby (chemical sensitivity)"],
        ["gutterDebris", "Gutters have heavy debris"],
        ["gatedAccess", "Gated/secure property — access code or key needed"],
        ["occupied", "Property occupied during the service"],
        ["biohazard", "Biohazard or pet waste present"],
        ["photosAvailable", "I have photos I can share"],
        ["helpChoosingMethod", "I'd like help choosing a cleaning method"]
      ];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 4 of 6 — Site Conditions</h3>' +
        '<p class="planner-panel-intro">Select anything that applies. This helps flag what a firm quote will need to account for.</p>' +
        '<div class="planner-condition-grid" role="group" aria-labelledby="planner-panel-heading">' +
        CONDITION_LABELS.map(function (pair) {
          var key = pair[0], label = pair[1];
          var checked = state.conditions[key];
          return '<label class="planner-condition-item"><input type="checkbox" data-action="toggle-condition" data-key="' + key + '"' + (checked ? " checked" : "") + "> " + label + "</label>";
        }).join("") + "</div>";
    }

    function renderEstimate() {
      var results = computeResults(state, CFG.planner);
      state._lastResults = results;
      var currency = (CFG.planner && CFG.planner.currencySymbol) || "$";
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 5 of 6 — Estimate</h3>' +
        '<p class="planner-panel-intro">Preliminary planning estimate only — not a binding quote.</p>' +
        '<div class="planner-summary-grid">' +
        resultCard(results.totalAreaM2 + " m²", "Measured area") +
        resultCard(results.adjustmentPercent + "%", "Complexity adjustment") +
        resultCard(results.adjustedAreaM2 + " m²", "Adjusted coverage") +
        resultCard(results.estimatedHours === null ? "Unknown" : results.estimatedHours + " hr", "Estimated time (approx.)") +
        resultCard(results.costEstimate === null ? "Not provided" : currency + results.costEstimate, "Cost estimate (approx.)") +
        "</div>" +
        '<details class="planner-explain"><summary>How this is calculated</summary><ul>' +
        "<li>Area = length × width × quantity, converted to m², summed across all entries.</li>" +
        "<li>Complexity adjustment = soiling-level % + access-difficulty %, from your selections in Step 3.</li>" +
        "<li>Adjusted coverage = measured area × (1 + complexity adjustment %).</li>" +
        "<li>Estimated time = adjusted coverage ÷ the configured m²-per-hour rate for the selected surface type, rounded up to the nearest half hour.</li>" +
        "</ul></details>" +
        (results.missing.length ? '<ul class="planner-missing-list">' + results.missing.map(function (m) { return "<li>⚠ " + escapeHtml(m) + "</li>"; }).join("") + "</ul>" : "") +
        '<p class="planner-field-hint">' + escapeHtml((CFG.legal && CFG.legal.measurementDisclaimer) || "") + "</p>";
    }
    function resultCard(value, label) {
      return '<div class="planner-result-card"><div class="value">' + value + '</div><div class="label">' + label + "</div></div>";
    }

    function renderContact() {
      var results = state._lastResults || computeResults(state, CFG.planner);
      var summary = buildSummaryText(state, results, CFG.planner);
      var checklist = (CFG.planner && CFG.planner.photoChecklist) || [];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 6 of 6 — Your Details &amp; Send</h3>' +
        '<p class="planner-panel-intro">' + escapeHtml((CFG.planner && CFG.planner.privacyNote) || "") + '</p>' +
        '<div class="planner-field-grid">' +
        textField("contact-name", "Full name", state.contact.name, "name") +
        textField("contact-phone", "Phone", state.contact.phone, "phone") +
        textField("contact-email", "Email", state.contact.email, "email") +
        textField("contact-suburb", "Suburb / area", state.contact.suburb, "suburb") +
        textField("contact-timeframe", "Preferred start timeframe", state.contact.timeframe, "timeframe") +
        '<div class="planner-field"><label for="contact-method">Preferred contact method</label>' +
        '<select id="contact-method" data-action="contact-field" data-field="method">' +
        ["whatsapp", "email", "phone"].map(function (m) { return '<option value="' + m + '"' + (state.contact.method === m ? " selected" : "") + ">" + m + "</option>"; }).join("") +
        "</select></div>" +
        "</div>" +
        '<div class="planner-field" style="margin-top:1rem;"><label for="contact-notes">Additional notes</label><textarea id="contact-notes" rows="2" data-action="contact-field" data-field="notes">' + escapeHtml(state.contact.notes) + "</textarea></div>" +

        '<h4 style="margin-top:1.75rem;margin-bottom:0.5rem;">Photos to attach manually</h4>' +
        '<p class="planner-field-hint">Selected files stay in your browser and are never uploaded automatically — attach them yourself via WhatsApp or email.</p>' +
        '<ul class="planner-checklist">' + checklist.map(function (c) { return "<li>☐ " + escapeHtml(c) + "</li>"; }).join("") + "</ul>" +
        ((CFG.planner.features && CFG.planner.features.enablePhotoPreview) ?
          '<div class="planner-field"><label for="photo-preview-input">Optional: preview photos locally (not uploaded)</label><input type="file" id="photo-preview-input" accept="image/*" multiple></div><div id="photo-preview-strip" style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.5rem;"></div>' : "") +

        '<h4 style="margin-top:1.75rem;margin-bottom:0.5rem;">Project Summary</h4>' +
        '<textarea class="planner-summary-text" id="summary-text" readonly>' + escapeHtml(summary) + "</textarea>" +

        '<div class="planner-handoff-grid" style="margin-top:1.25rem;">' +
        '<div class="planner-handoff-card"><h4>Copy / Print / Download</h4>' +
        '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">' +
        '<button type="button" class="btn-secondary" data-action="copy-summary">Copy Summary</button>' +
        '<button type="button" class="btn-secondary" data-action="print-summary">Print Summary</button>' +
        '<button type="button" class="btn-secondary" data-action="download-summary">Download .txt</button>' +
        "</div></div>" +
        '<div class="planner-handoff-card"><h4>Send to us</h4>' +
        '<div style="display:flex;gap:0.75rem;flex-wrap:wrap;">' +
        '<button type="button" class="btn-whatsapp" data-action="send-whatsapp">Send via WhatsApp</button>' +
        '<button type="button" class="btn-secondary" data-action="send-email">Send via Email</button>' +
        '<button type="button" class="btn-primary" data-action="request-site-visit">Request Site Visit</button>' +
        "</div></div></div>" +
        '<p class="planner-privacy-note">' + escapeHtml((CFG.planner && CFG.planner.privacyNote) || "") + '</p>' +
        '<button type="button" class="btn-link" data-action="reset-planner" style="margin-top:1rem;">Reset project</button>';
    }
    function textField(id, label, value, key) {
      return '<div class="planner-field"><label for="' + id + '">' + label + '</label><input type="text" id="' + id + '" data-action="contact-field" data-field="' + key + '" value="' + escapeHtml(value) + '"></div>';
    }

    var RENDERERS = { type: renderType, areas: renderAreas, surface: renderSurface, conditions: renderConditions, estimate: renderEstimate, contact: renderContact };

    function renderStep() {
      renderStepIndicator();
      refreshPanel();
      panel.focus();
      persist();
    }

    /** Re-renders just the current step's fields, then re-appends Back/Continue. */
    function refreshPanel() {
      RENDERERS[STEPS[state.step]]();
      renderNav();
      persist();
    }

    function renderNav() {
      var isFirst = state.step === 0;
      var isLast = state.step === STEPS.length - 1;
      var nav = document.createElement("div");
      nav.className = "planner-actions";
      nav.innerHTML =
        '<button type="button" class="btn-secondary" data-action="back"' + (isFirst ? " disabled" : "") + ">← Back</button>" +
        '<div class="planner-actions-right">' +
        (isLast ? "" : '<button type="button" class="btn-primary" data-action="next">Continue →</button>') +
        "</div>";
      panel.appendChild(nav);
    }

    function validateStep() {
      var key = STEPS[state.step];
      if (key === "type" && !state.projectType) {
        panel.querySelector("#type-error").textContent = "Please select a project type.";
        announce("Please select a project type.");
        return false;
      }
      if (key === "areas") {
        var sum = sumAreas(state.areas);
        var ok = true;
        sum.perEntry.forEach(function (entry, i) {
          var errEl = panel.querySelector("#area-length-error-" + state.areas[i].id);
          if (entry.errors.length) { if (errEl) errEl.textContent = entry.errors[0]; ok = false; }
          else if (errEl) errEl.textContent = "";
        });
        if (!ok) announce("Please fix the highlighted measurement fields.");
        return ok;
      }
      return true;
    }

    function goStep(delta) {
      if (delta > 0 && !validateStep()) return;
      var next = state.step + delta;
      if (next < 0 || next >= STEPS.length) return;
      state.step = next;
      renderStep();
    }

    /* ---------------- Event delegation ---------------- */
    mount.addEventListener("click", function (e) {
      var t = e.target.closest("[data-action]");
      if (!t) return;
      var action = t.getAttribute("data-action");
      if (action === "set-type") { state.projectType = t.getAttribute("data-value"); refreshPanel(); announce("Project type set to " + state.projectType); }
      else if (action === "set-area-mode") { state.areaMode = t.getAttribute("data-value"); refreshPanel(); }
      else if (action === "set-surface-type") { state.surfaceType = t.getAttribute("data-value"); refreshPanel(); }
      else if (action === "set-condition-level") { state.conditionLevel = t.getAttribute("data-value"); refreshPanel(); }
      else if (action === "set-access-level") { state.accessLevel = t.getAttribute("data-value"); refreshPanel(); }
      else if (action === "add-area") {
        state.areas.push({ id: state.nextAreaId, label: "Area " + state.nextAreaId, length: "", width: "", count: 1, unit: state.unit });
        state.nextAreaId += 1;
        refreshPanel();
      }
      else if (action === "remove-area") {
        var id = parseInt(t.getAttribute("data-id"), 10);
        state.areas = state.areas.filter(function (a) { return a.id !== id; });
        refreshPanel();
      }
      else if (action === "back") goStep(-1);
      else if (action === "next") goStep(1);
      else if (action === "reset-planner") {
        if (window.confirm("Reset the planner? This clears everything you've entered.")) {
          state = defaultState();
          try { localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(STORAGE_KEY + "-consent"); } catch (err) {}
          renderStep();
        }
      }
      else if (action === "copy-summary") {
        var text = panel.querySelector("#summary-text").value;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () { announce("Summary copied to clipboard."); });
        } else { announce("Copy not supported in this browser — select the text manually."); }
      }
      else if (action === "print-summary") { window.print(); }
      else if (action === "download-summary") {
        var blob = new Blob([panel.querySelector("#summary-text").value], { type: "text/plain" });
        var url = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url; a.download = "surface-cleaning-project-summary.txt";
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      else if (action === "send-whatsapp") {
        var results = state._lastResults || computeResults(state, CFG.planner);
        var msg = ((CFG.planner && CFG.planner.whatsappMessageIntro) || "") + "\n\n" + buildSummaryText(state, results, CFG.planner);
        window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
      }
      else if (action === "send-email") {
        var r2 = state._lastResults || computeResults(state, CFG.planner);
        var body = buildSummaryText(state, r2, CFG.planner);
        window.location.href = "mailto:" + CFG.contact.email + "?subject=" + encodeURIComponent("Surface Cleaning Estimate Planner Quote Request") + "&body=" + encodeURIComponent(body);
      }
      else if (action === "request-site-visit") {
        var quoteNotes = document.getElementById("quote-notes");
        var r3 = state._lastResults || computeResults(state, CFG.planner);
        if (quoteNotes) quoteNotes.value = buildSummaryText(state, r3, CFG.planner);
        var quoteSection = document.getElementById("quote");
        if (quoteSection) {
          quoteSection.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
          var nameField = document.getElementById("quote-name");
          if (nameField) nameField.focus();
        }
        announce("Your project summary has been added to the quote form below.");
      }
    });

    mount.addEventListener("input", function (e) {
      var t = e.target;
      var action = t.getAttribute && t.getAttribute("data-action");
      if (!action) return;
      if (action === "area-field") {
        var id = parseInt(t.getAttribute("data-id"), 10);
        var f = t.getAttribute("data-field");
        var area = state.areas.filter(function (a) { return a.id === id; })[0];
        if (area) area[f] = t.value;
      } else if (action === "set-field") {
        state[t.getAttribute("data-field")] = t.value;
      } else if (action === "contact-field") {
        state.contact[t.getAttribute("data-field")] = t.value;
      } else if (action === "set-unit") {
        state.unit = t.value;
        state.areas.forEach(function (a) { a.unit = t.value; });
      }
      persist();
    });

    mount.addEventListener("change", function (e) {
      var t = e.target;
      if (t.getAttribute && t.getAttribute("data-action") === "toggle-condition") {
        state.conditions[t.getAttribute("data-key")] = t.checked;
        persist();
      }
      if (t.id === "photo-preview-input") {
        var strip = document.getElementById("photo-preview-strip");
        if (!strip) return;
        strip.innerHTML = "";
        Array.prototype.slice.call(t.files).slice(0, 8).forEach(function (file) {
          var url = URL.createObjectURL(file);
          var img = document.createElement("img");
          img.src = url; img.alt = "Locally previewed photo — not uploaded"; img.style.width = "64px"; img.style.height = "64px"; img.style.objectFit = "cover"; img.style.borderRadius = "6px";
          strip.appendChild(img);
        });
      }
    });

    if (restoredNotice) announce("Restored your saved progress. Use Reset project to start over.");
    renderStep();
  }

  var SurfacePlanner = { calc: calc, initUI: initUI };
  root.SurfacePlanner = SurfacePlanner;

  if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", initUI);
  }

  // CommonJS export shim so tests/planner.test.js can run under plain Node.
  if (typeof module !== "undefined" && module.exports) {
    module.exports = SurfacePlanner;
  }
})(typeof window !== "undefined" ? window : global);
