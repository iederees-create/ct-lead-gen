/**
 * Surface Cleaning Estimate Planner & Quote Builder
 * ============================================================
 * Original interactive tool for the Hydro Clean template.
 *
 * Exposes two things on window.SurfacePlanner:
 *   - calc: pure, dependency-free calculation functions (unit
 *     conversion, area, allowance, surface/box counts, material
 *     guidance, summary text). These are unit-tested directly
 *     from Node — see tests/planner.test.js — and are also
 *     usable via `require()` in a CommonJS test runner because of
 *     the export shim at the bottom of this file.
 *   - ui: the accessible multi-step wizard that mounts into
 *     #surface-planner-app and calls into `calc`.
 *
 * IMPORTANT: this tool produces PRELIMINARY PLANNING ESTIMATES
 * ONLY. It does not calculate a binding labour quote, and it does
 * not claim cleaning input/solution/access review coverage rates are
 * universally exact. See site-config.js `planner.materialGuidance`
 * and `legal.measurementDisclaimer`.
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

  /** Applies a allowance percentage (e.g. 10 for 10%) to an area. Never negative. */
  function applyAllowance(areaM2, allowancePercent) {
    if (!isFiniteNumber(areaM2) || areaM2 < 0) return 0;
    var pct = isFiniteNumber(allowancePercent) && allowancePercent >= 0 ? allowancePercent : 0;
    var result = areaM2 * (1 + pct / 100);
    return isFiniteNumber(result) && result >= 0 ? result : areaM2;
  }

  /** Area of a single surface in m², from length/width given in centimetres. */
  function surfaceAreaM2(surfaceLengthCm, surfaceWidthCm) {
    var l = validateDimension(surfaceLengthCm, "Surface length");
    var w = validateDimension(surfaceWidthCm, "Surface width");
    if (l.value === null || w.value === null) return null;
    var area = (l.value / 100) * (w.value / 100);
    return isFiniteNumber(area) && area > 0 ? area : null;
  }

  /** Number of estimated surface units, rounded up. Never negative/NaN/Infinity. */
  function calcSurfaceCount(adjustedAreaM2, surfaceAreaSqM) {
    if (!isFiniteNumber(adjustedAreaM2) || adjustedAreaM2 <= 0) return 0;
    if (!isFiniteNumber(surfaceAreaSqM) || surfaceAreaSqM <= 0) return null;
    var count = Math.ceil(adjustedAreaM2 / surfaceAreaSqM);
    return isFiniteNumber(count) && count >= 0 ? count : null;
  }

  /**
   * Rate units required. Prefers surfacesPerBox; falls back to sqmPerBox.
   * Returns null when neither is supplied (unknown, not zero).
   */
  function calcBoxCount(surfaceCount, sqmTotal, surfacesPerBox, sqmPerBox) {
    var perBox = validateDimension(surfacesPerBox, "Rate units");
    if (perBox.value !== null && isFiniteNumber(surfaceCount) && surfaceCount >= 0) {
      return Math.ceil(surfaceCount / perBox.value);
    }
    var perBoxArea = validateDimension(sqmPerBox, "Area per box");
    if (perBoxArea.value !== null && isFiniteNumber(sqmTotal) && sqmTotal >= 0) {
      return Math.ceil(sqmTotal / perBoxArea.value);
    }
    return null;
  }

  /** Estimated material cost. Returns null when no pricing was supplied. */
  function calcMaterialCost(surfaceCount, boxCount, pricePerSurface, pricePerBox) {
    var boxPrice = validateDimension(pricePerBox, "Price per box");
    if (boxPrice.value !== null && isFiniteNumber(boxCount) && boxCount >= 0) {
      return round2(boxPrice.value * boxCount);
    }
    var surfacePrice = validateDimension(pricePerSurface, "Price per surface");
    if (surfacePrice.value !== null && isFiniteNumber(surfaceCount) && surfaceCount >= 0) {
      return round2(surfacePrice.value * surfaceCount);
    }
    return null;
  }

  function round2(n) {
    return isFiniteNumber(n) ? Math.round(n * 100) / 100 : null;
  }

  /**
   * Indicative-only material guidance (cleaning input/solution/levelling/
   * access review). Returns nulls for anything not applicable or
   * not configured with a positive coverage rate. Never negative.
   */
  function calcMaterialGuidance(adjustedAreaM2, conditions, guidanceCfg) {
    var out = { cleaning inputBags: null, solutionKg: null, levellingBags: null, access reviewLiters: null };
    if (!guidanceCfg || !guidanceCfg.enabled || !isFiniteNumber(adjustedAreaM2) || adjustedAreaM2 <= 0) {
      return out;
    }
    var cleaning inputCov = guidanceCfg.cleaning inputCoveragePerBagM2;
    if (isFiniteNumber(cleaning inputCov) && cleaning inputCov > 0) {
      out.cleaning inputBags = Math.ceil(adjustedAreaM2 / cleaning inputCov);
    }
    var solutionCov = guidanceCfg.solutionCoveragePerKgM2;
    if (isFiniteNumber(solutionCov) && solutionCov > 0) {
      out.solutionKg = Math.ceil((adjustedAreaM2 / solutionCov) * 2) / 2; // nearest 0.5kg
    }
    if (conditions && conditions.levelling) {
      var levelCov = guidanceCfg.levellingCompoundCoveragePerBagM2;
      if (isFiniteNumber(levelCov) && levelCov > 0) {
        out.levellingBags = Math.ceil(adjustedAreaM2 / levelCov);
      }
    }
    if (conditions && conditions.access review) {
      var waterCov = guidanceCfg.access reviewCoveragePerLM2;
      if (isFiniteNumber(waterCov) && waterCov > 0) {
        out.access reviewLiters = Math.ceil((adjustedAreaM2 / waterCov) * 2) / 2; // nearest 0.5L
      }
    }
    return out;
  }

  /** Human-readable list of what's still missing for an accurate quote. */
  function calcMissingInfo(state, results) {
    var missing = [];
    if (!state.projectType) missing.push("Project type not selected.");
    if (results.totalAreaM2 <= 0) missing.push("No valid area measurements entered yet.");
    if (!state.surface || !isFiniteNumber(results.surfaceAreaSqM)) missing.push("Area dimensions (length × width) not provided.");
    if (results.boxCount === null) missing.push("Surfaces-per-box or coverage-per-box not provided — box estimate unavailable.");
    if (results.materialCost === null) missing.push("No pricing provided — material cost estimate unavailable.");
    if (state.conditions && (state.conditions.access review || state.conditions.underfloorHeating)) {
      missing.push("Access review/underfloor heating present — a site inspection is recommended before a firm quote.");
    }
    if (state.conditions && state.conditions.complexCuts) {
      missing.push("Complex cuts/corners noted — final allowance may exceed the selected preset.");
    }
    return missing;
  }

  /** Runs the full calculation pipeline from a planner state object. */
  function computeResults(state, cfg) {
    var areaSum = sumAreas(state.areas);
    var totalAreaM2 = areaSum.total;
    var allowancePercent = state.allowancePreset === "custom"
      ? (isFiniteNumber(state.customAllowance) ? state.customAllowance : 0)
      : (state.allowanceValue !== undefined ? state.allowanceValue : 10);
    var adjustedAreaM2 = applyAllowance(totalAreaM2, allowancePercent);
    var surfaceAreaSqM = state.surface ? surfaceAreaM2(state.surface.length, state.surface.width) : null;
    var surfaceCount = surfaceAreaSqM ? calcSurfaceCount(adjustedAreaM2, surfaceAreaSqM) : 0;
    var boxCount = state.surface
      ? calcBoxCount(surfaceCount, adjustedAreaM2, state.surface.surfacesPerBox, state.surface.sqmPerBox)
      : null;
    var materialCost = state.surface
      ? calcMaterialCost(surfaceCount, boxCount, state.surface.pricePerSurface, state.surface.pricePerBox)
      : null;
    var guidance = calcMaterialGuidance(adjustedAreaM2, state.conditions, cfg && cfg.materialGuidance);

    var results = {
      totalAreaM2: round2(totalAreaM2),
      allowancePercent: allowancePercent,
      adjustedAreaM2: round2(adjustedAreaM2),
      surfaceAreaSqM: surfaceAreaSqM,
      surfaceCount: surfaceCount,
      boxCount: boxCount,
      materialCost: materialCost,
      guidance: guidance,
      areaErrors: areaSum.hasErrors,
      perEntry: areaSum.perEntry
    };
    results.missing = calcMissingInfo(state, results);
    return results;
  }

  /** Builds the plain-text structured summary shared across all handoff actions. */
  function buildSummaryText(state, results, cfg) {
    var lines = [];
    var currency = (cfg && cfg.currencySymbol) || "$";
    lines.push("SURFACE CLEANING ESTIMATE PLANNER SUMMARY");
    lines.push("Project type: " + (state.projectType || "Not specified"));
    lines.push("Area mode: " + (state.areaMode || "Not specified"));
    lines.push("Layout: " + (state.layout || "Not specified"));
    lines.push("");
    lines.push("Measurements (" + state.unit + "):");
    (state.areas || []).forEach(function (a, i) {
      lines.push("  " + (a.label || "Area " + (i + 1)) + ": " + a.length + " x " + a.width + " " + state.unit + ", qty " + (a.count || 1));
    });
    lines.push("");
    lines.push("Total measured area: " + (results.totalAreaM2 || 0) + " m2");
    lines.push("Allowance allowance: " + results.allowancePercent + "%");
    lines.push("Adjusted coverage required: " + (results.adjustedAreaM2 || 0) + " m2");
    if (state.surface) {
      lines.push("Area dimensions: " + state.surface.length + "cm x " + state.surface.width + "cm");
      lines.push("Estimated surfaces needed: " + (results.surfaceCount || "Unknown"));
      lines.push("Estimated rate units needed: " + (results.boxCount === null ? "Unknown (add box coverage)" : results.boxCount));
      if (results.materialCost !== null) lines.push("Estimated material cost: " + currency + results.materialCost);
    }
    var conditionLabels = [];
    var CONDITION_TEXT = {
      removeExisting: "Existing surfaces must be removed", levelling: "Surface requires levelling",
      access review: "Access review required", skirting: "Skirting estimated surface units", steps: "Stairs or steps",
      niches: "Niches", complexCuts: "Corners / complex cuts", outdoor: "Outdoor exposure",
      underfloorHeating: "Underfloor heating", occupied: "Occupied property",
      materialPurchased: "Material already purchased", helpChoosing: "Help choosing surfaces requested"
    };
    Object.keys(state.conditions || {}).forEach(function (key) {
      if (state.conditions[key] && CONDITION_TEXT[key]) conditionLabels.push(CONDITION_TEXT[key]);
    });
    if (conditionLabels.length) { lines.push(""); lines.push("Site conditions: " + conditionLabels.join(", ")); }
    if (results.guidance && (results.guidance.cleaning inputBags || results.guidance.solutionKg)) {
      lines.push("");
      lines.push("Indicative material guidance (not a purchasing spec):");
      if (results.guidance.cleaning inputBags) lines.push("  Cleaning input: ~" + results.guidance.cleaning inputBags + " bag(s)");
      if (results.guidance.solutionKg) lines.push("  Solution: ~" + results.guidance.solutionKg + " kg");
      if (results.guidance.levellingBags) lines.push("  Levelling compound: ~" + results.guidance.levellingBags + " bag(s)");
      if (results.guidance.access reviewLiters) lines.push("  Access review membrane: ~" + results.guidance.access reviewLiters + " L");
    }
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
    lines.push("This is a preliminary planning estimate only, not a binding quote. Actual quantities vary by surface type, layout, cuts, breakage and site conditions.");
    return lines.join("\n");
  }

  var calc = {
    UNIT_TO_M: UNIT_TO_M,
    validateDimension: validateDimension,
    toMeters: toMeters,
    calcEntryArea: calcEntryArea,
    sumAreas: sumAreas,
    applyAllowance: applyAllowance,
    surfaceAreaM2: surfaceAreaM2,
    calcSurfaceCount: calcSurfaceCount,
    calcBoxCount: calcBoxCount,
    calcMaterialCost: calcMaterialCost,
    calcMaterialGuidance: calcMaterialGuidance,
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

    var STEPS = ["type", "areas", "surface", "layout", "conditions", "allowance", "results", "contact"];
    var STEP_LABELS = { type: "Project", areas: "Measure", surface: "Surface", layout: "Layout", conditions: "Site", allowance: "Allowance", results: "Estimate", contact: "Send" };
    var STORAGE_KEY = "ttc-planner-state-v1";

    function defaultState() {
      return {
        step: 0,
        projectType: "",
        areaMode: "single",
        unit: (CFG.planner && CFG.planner.unitDefault) || "m",
        areas: [{ id: 1, label: "Area 1", length: "", width: "", count: 1, unit: (CFG.planner && CFG.planner.unitDefault) || "m" }],
        surface: { length: "", width: "", surfacesPerBox: "", sqmPerBox: "", pricePerSurface: "", pricePerBox: "" },
        layout: "straight-lay",
        conditions: {
          removeExisting: false, levelling: false, access review: false, skirting: false, steps: false,
          niches: false, complexCuts: false, outdoor: false, underfloorHeating: false, occupied: false,
          materialPurchased: false, helpChoosing: false
        },
        allowancePreset: "standard",
        allowanceValue: 10,
        customAllowance: 10,
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
        '<h3 id="planner-panel-heading">Step 1 of 8 — Project Type</h3>' +
        '<p class="planner-panel-intro">What are you exterior cleaning?</p>' +
        '<div class="planner-option-grid" role="group" aria-labelledby="planner-panel-heading">' +
        types.map(function (t) {
          return '<button type="button" class="planner-option-card' + (state.projectType === t ? " is-selected" : "") +
            '" data-action="set-type" data-value="' + escapeHtml(t) + '" aria-pressed="' + (state.projectType === t) + '">' + escapeHtml(t) + "</button>";
        }).join("") + "</div>" +
        '<p class="planner-field-error" id="type-error"></p>';
    }

    function renderAreas() {
      var modes = [
        { id: "single", label: "Single rectangular area" }, { id: "multiple", label: "Multiple areas" },
        { id: "walls", label: "Individual walls" }, { id: "floor-plus-walls", label: "Floor plus walls" }
      ];
      var isWallMode = state.areaMode === "walls";
      var secondDimLabel = isWallMode ? "Height" : "Width";
      var html =
        '<h3 id="planner-panel-heading">Step 2 of 8 — Measurements</h3>' +
        '<p class="planner-panel-intro">Choose how you want to measure, then enter each area.' +
        (state.areaMode === "floor-plus-walls" ? ' For wall entries, enter the wall height in the second dimension field.' : '') + '</p>' +
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
      var t = state.surface;
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 3 of 8 — Surface Details</h3>' +
        '<p class="planner-panel-intro">Enter the surface you plan to use. Pricing fields are optional.</p>' +
        '<div class="planner-field-grid">' +
        field("surface-length", "Surface length (cm)", t.length, "surface", "length") +
        field("surface-width", "Surface width (cm)", t.width, "surface", "width") +
        field("surface-surfacesPerBox", "Rate units (optional)", t.surfacesPerBox, "surface", "surfacesPerBox") +
        field("surface-sqmPerBox", "m² per box (optional)", t.sqmPerBox, "surface", "sqmPerBox") +
        field("surface-pricePerSurface", "Price per surface (optional)", t.pricePerSurface, "surface", "pricePerSurface") +
        field("surface-pricePerBox", "Price per box (optional)", t.pricePerBox, "surface", "pricePerBox") +
        "</div>" +
        '<p class="planner-field-hint">Only one of "rate units" or "m² per box" is needed. Leave pricing blank to skip a cost estimate.</p>';
    }

    function field(id, label, value, group, key) {
      return '<div class="planner-field"><label for="' + id + '">' + label + '</label>' +
        '<input type="number" min="0" step="any" id="' + id + '" data-action="obj-field" data-group="' + group + '" data-field="' + key + '" value="' + escapeHtml(value) + '"></div>';
    }

    function renderLayout() {
      var gallery = CFG.layoutGallery || [];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 4 of 8 — Layout</h3>' +
        '<p class="planner-panel-intro">Layout affects cutting waste — see the allowance step for guidance.</p>' +
        '<div class="planner-option-grid" role="group" aria-labelledby="planner-panel-heading">' +
        gallery.map(function (g) {
          return '<button type="button" class="planner-option-card' + (state.layout === g.id ? " is-selected" : "") +
            '" data-action="set-layout" data-value="' + g.id + '" aria-pressed="' + (state.layout === g.id) + '">' + escapeHtml(g.name) + '<br><span style="font-weight:400;color:var(--text-secondary);font-size:0.78rem;">' + escapeHtml(g.note) + "</span></button>";
        }).join("") + "</div>";
    }

    function renderConditions() {
      var CONDITION_LABELS = [
        ["removeExisting", "Existing surfaces must be removed"], ["levelling", "Surface requires levelling"],
        ["access review", "Access review required"], ["skirting", "Skirting estimated surface units"],
        ["steps", "Stairs or steps"], ["niches", "Niches"], ["complexCuts", "Corners or complex cuts"],
        ["outdoor", "Outdoor exposure"], ["underfloorHeating", "Underfloor heating"],
        ["occupied", "Occupied property"], ["materialPurchased", "Material already purchased"],
        ["helpChoosing", "Help choosing estimated surface units"]
      ];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 5 of 8 — Project Conditions</h3>' +
        '<p class="planner-panel-intro">Select anything that applies. This helps flag what a firm quote will need to account for.</p>' +
        '<div class="planner-condition-grid" role="group" aria-labelledby="planner-panel-heading">' +
        CONDITION_LABELS.map(function (pair) {
          var key = pair[0], label = pair[1];
          var checked = state.conditions[key];
          return '<label class="planner-condition-item"><input type="checkbox" data-action="toggle-condition" data-key="' + key + '"' + (checked ? " checked" : "") + "> " + label + "</label>";
        }).join("") + "</div>";
    }

    function renderAllowance() {
      var presets = (CFG.planner && CFG.planner.allowancePresets) || [];
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 6 of 8 — Allowance Allowance</h3>' +
        '<p class="planner-panel-intro">' + escapeHtml((CFG.planner && CFG.planner.allowanceDisclaimer) || "") + '</p>' +
        '<div class="planner-option-grid" role="group" aria-labelledby="planner-panel-heading">' +
        presets.map(function (p) {
          return '<button type="button" class="planner-option-card' + (state.allowancePreset === p.id ? " is-selected" : "") +
            '" data-action="set-allowance-preset" data-id="' + p.id + '" data-value="' + (p.value === null ? "" : p.value) + '" aria-pressed="' + (state.allowancePreset === p.id) + '">' + p.label + '<br><span style="font-weight:400;color:var(--text-secondary);font-size:0.78rem;">' + escapeHtml(p.note) + "</span></button>";
        }).join("") + "</div>" +
        (state.allowancePreset === "custom" ?
          '<div class="planner-field" style="max-width:200px;margin-top:1rem;"><label for="custom-allowance">Custom allowance %</label><input type="number" min="0" step="0.5" id="custom-allowance" data-action="set-custom-allowance" value="' + escapeHtml(state.customAllowance) + '"></div>' : "");
    }

    function renderResults() {
      var results = computeResults(state, CFG.planner);
      state._lastResults = results;
      var currency = (CFG.planner && CFG.planner.currencySymbol) || "$";
      panel.innerHTML =
        '<h3 id="planner-panel-heading">Step 7 of 8 — Estimate</h3>' +
        '<p class="planner-panel-intro">Preliminary planning estimate only — not a binding quote.</p>' +
        '<div class="planner-summary-grid">' +
        resultCard(results.totalAreaM2 + " m²", "Measured area") +
        resultCard(results.allowancePercent + "%", "Allowance allowance") +
        resultCard(results.adjustedAreaM2 + " m²", "Adjusted coverage") +
        resultCard(results.surfaceCount === null ? "—" : results.surfaceCount, "Surfaces needed (approx.)") +
        resultCard(results.boxCount === null ? "Unknown" : results.boxCount, "Rate units needed (approx.)") +
        resultCard(results.materialCost === null ? "Not provided" : currency + results.materialCost, "Material cost (approx.)") +
        "</div>" +
        (results.guidance.cleaning inputBags || results.guidance.solutionKg || results.guidance.levellingBags || results.guidance.access reviewLiters ?
          '<div class="planner-explain"><strong>Indicative material guidance (not a purchasing spec):</strong><ul>' +
          (results.guidance.cleaning inputBags ? "<li>Cleaning input: ~" + results.guidance.cleaning inputBags + " bag(s)</li>" : "") +
          (results.guidance.solutionKg ? "<li>Solution: ~" + results.guidance.solutionKg + " kg</li>" : "") +
          (results.guidance.levellingBags ? "<li>Levelling compound: ~" + results.guidance.levellingBags + " bag(s)</li>" : "") +
          (results.guidance.access reviewLiters ? "<li>Access review membrane: ~" + results.guidance.access reviewLiters + " L</li>" : "") +
          "</ul>" + escapeHtml((CFG.planner.materialGuidance && CFG.planner.materialGuidance.disclaimer) || "") + "</div>" : "") +
        '<details class="planner-explain"><summary>How this is calculated</summary><ul>' +
        "<li>Area = length × width × quantity, converted to m², summed across all entries.</li>" +
        "<li>Adjusted coverage = measured area × (1 + allowance %).</li>" +
        "<li>Surfaces needed = adjusted coverage ÷ single-surface area, rounded up.</li>" +
        "<li>Rate units needed = surfaces ÷ rate configuration, or coverage ÷ m² per box, rounded up.</li>" +
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
        '<h3 id="planner-panel-heading">Step 8 of 8 — Your Details &amp; Send</h3>' +
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

    var RENDERERS = { type: renderType, areas: renderAreas, surface: renderSurface, layout: renderLayout, conditions: renderConditions, allowance: renderAllowance, results: renderResults, contact: renderContact };

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
      else if (action === "set-layout") { state.layout = t.getAttribute("data-value"); refreshPanel(); }
      else if (action === "set-allowance-preset") {
        state.allowancePreset = t.getAttribute("data-id");
        var v = t.getAttribute("data-value");
        state.allowanceValue = v === "" ? state.customAllowance : parseFloat(v);
        refreshPanel();
      }
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
        a.href = url; a.download = "surface-project-summary.txt";
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
      } else if (action === "obj-field") {
        var group = t.getAttribute("data-group");
        state[group][t.getAttribute("data-field")] = t.value;
      } else if (action === "contact-field") {
        state.contact[t.getAttribute("data-field")] = t.value;
      } else if (action === "set-custom-allowance") {
        state.customAllowance = parseFloat(t.value) || 0;
        state.allowanceValue = state.customAllowance;
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
