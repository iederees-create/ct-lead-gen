/**
 * Renovation Scope & Budget Planner — pure calculation engine.
 *
 * Every function here is a pure function of its arguments (no DOM, no
 * globals) so it can run identically in the browser (app.js wires it to
 * the form) and under Node's built-in test runner (tests/planner.test.js).
 * All rates, multipliers and copy live in the `plannerConfig` argument —
 * this module hardcodes no business-specific assumptions.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.RenovationPlanner = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var PROJECT_TYPE_ORDER = [
    "room-renovation", "bathroom-renovation", "kitchen-renovation",
    "home-extension", "new-build", "paving", "boundary-wall",
    "commercial-renovation", "other"
  ];

  var TRADE_KEYS = [
    "demolition", "structuralAlterations", "plumbing", "electrical",
    "waterproofing", "roofing", "painting", "flooring"
  ];

  var TRADE_LABELS = {
    demolition: "Demolition",
    structuralAlterations: "Structural Alterations",
    plumbing: "Plumbing",
    electrical: "Electrical Work",
    waterproofing: "Waterproofing",
    roofing: "Roofing",
    painting: "Painting",
    flooring: "Flooring"
  };

  var GENERIC_PHOTO_CHECKLIST = [
    "Wide shot of the full area from the doorway or property entrance",
    "Each wall / boundary from a straight-on angle",
    "Any existing damage, cracking or damp staining",
    "Nearest electrical distribution board or meter box",
    "Access route from the street to the work area"
  ];

  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  /* -----------------------------------------------------------------
   * INPUT DEFAULTS + RESET
   * ------------------------------------------------------------- */
  function defaultInput() {
    return {
      projectName: "",
      projectType: "",
      lengthM: "",
      widthM: "",
      totalFloorArea: "",
      numberOfRooms: "",
      numberOfStoreys: "1",
      finishLevel: "",
      demolition: false,
      structuralAlterations: false,
      plumbing: false,
      electrical: false,
      waterproofing: false,
      roofing: false,
      painting: false,
      flooring: false,
      siteAccess: "",
      occupancy: "",
      preferredStartDate: "",
      targetBudget: "",
      suburb: "",
      customerName: "",
      customerContact: "",
      additionalNotes: ""
    };
  }

  /** Returns a brand-new default input object — used by the UI's Reset action. */
  function resetInput() {
    return defaultInput();
  }

  /* -----------------------------------------------------------------
   * NUMERIC PARSING (never returns NaN/Infinity — invalid -> null)
   * ------------------------------------------------------------- */
  function parsePositiveNumber(value) {
    if (value === "" || value === null || value === undefined) return null;
    var n = typeof value === "number" ? value : parseFloat(String(value).replace(/,/g, ""));
    if (!isFinite(n) || isNaN(n) || n <= 0) return null;
    return n;
  }

  function parseNonNegativeInt(value, fallback) {
    var n = parseInt(value, 10);
    if (!isFinite(n) || isNaN(n) || n < 0) return fallback;
    return n;
  }

  /* -----------------------------------------------------------------
   * QUANTITY (measured area / linear length)
   * ------------------------------------------------------------- */
  function computeQuantity(input, typeConfig) {
    var unit = (typeConfig && typeConfig.unit) || "sqm";
    var explicit = parsePositiveNumber(input.totalFloorArea);
    if (explicit !== null) {
      return { value: round2(explicit), unit: unit, source: "totalFloorArea" };
    }
    var length = parsePositiveNumber(input.lengthM);
    var width = parsePositiveNumber(input.widthM);
    if (unit === "linear-meter") {
      if (length !== null) return { value: round2(length), unit: unit, source: "dimensions" };
      return null;
    }
    if (length !== null && width !== null) {
      return { value: round2(length * width), unit: unit, source: "dimensions" };
    }
    return null;
  }

  function round2(n) { return Math.round(n * 100) / 100; }

  /* -----------------------------------------------------------------
   * COMPLEXITY
   * ------------------------------------------------------------- */
  function computeComplexity(input) {
    var score = 0;
    var reasons = [];

    if (input.structuralAlterations) { score += 2; reasons.push("Structural alterations selected"); }
    if (input.demolition) { score += 1; reasons.push("Demolition required"); }

    var storeys = parseNonNegativeInt(input.numberOfStoreys, 1);
    if (storeys >= 3) { score += 2; reasons.push("Three or more storeys"); }
    else if (storeys === 2) { score += 1; reasons.push("Two storeys"); }

    if (input.siteAccess === "difficult") { score += 2; reasons.push("Difficult site access"); }
    else if (input.siteAccess === "moderate") { score += 1; reasons.push("Moderate site access constraints"); }

    if (input.occupancy === "occupied") { score += 1; reasons.push("Property occupied during works"); }

    if (input.projectType === "home-extension" || input.projectType === "new-build" || input.projectType === "commercial-renovation") {
      score += 1;
      reasons.push("Project type typically involves multiple trades and approvals");
    }

    var level = score <= 1 ? "Low" : score <= 4 ? "Medium" : "High";
    return { level: level, score: score, reasons: reasons };
  }

  /* -----------------------------------------------------------------
   * BUDGET RANGE
   * ------------------------------------------------------------- */
  function computeBudgetRange(input, plannerConfig, quantity, complexity) {
    var currency = (plannerConfig && plannerConfig.currency) || { code: "USD", symbol: "$", locale: "en-US" };

    if (!plannerConfig || plannerConfig.budgetEnabled === false) {
      return { enabled: false, currency: currency };
    }

    if (!quantity || !isFinite(quantity.value) || quantity.value <= 0) {
      return {
        enabled: true,
        computable: false,
        currency: currency,
        reason: "Enter total floor area, or both length and width, to calculate a budget range."
      };
    }

    var typeConfig = plannerConfig.projectTypes && plannerConfig.projectTypes[input.projectType];
    if (!typeConfig) {
      return {
        enabled: true,
        computable: false,
        currency: currency,
        reason: "Select a project type to calculate a budget range."
      };
    }

    var finishMultipliers = plannerConfig.finishMultipliers || {};
    var finishMultiplier = finishMultipliers[input.finishLevel];
    var usedFinishLevel = input.finishLevel;
    if (typeof finishMultiplier !== "number" || !isFinite(finishMultiplier) || finishMultiplier <= 0) {
      finishMultiplier = finishMultipliers.Standard && finishMultipliers.Standard > 0 ? finishMultipliers.Standard : 1;
      usedFinishLevel = "Standard (default — no finish level selected)";
    }

    var rateMin = Number(typeConfig.rateMin) || 0;
    var rateMax = Number(typeConfig.rateMax) || 0;
    if (rateMax < rateMin) { var tmp = rateMax; rateMax = rateMin; rateMin = tmp; }

    var baseMin = quantity.value * rateMin * finishMultiplier;
    var baseMax = quantity.value * rateMax * finishMultiplier;

    var addOnPercent = 0;
    var tradeAddOns = plannerConfig.tradeAddOnPercent || {};
    TRADE_KEYS.forEach(function (key) {
      if (input[key] && typeof tradeAddOns[key] === "number") addOnPercent += tradeAddOns[key];
    });
    var addOnFactor = 1 + addOnPercent / 100;

    var complexityCfg = plannerConfig.complexity || {};
    var siteAccessMult = (complexityCfg.siteAccessMultiplier && complexityCfg.siteAccessMultiplier[input.siteAccess]) || 1;
    var storeys = parseNonNegativeInt(input.numberOfStoreys, 1);
    var storeyKey = storeys >= 3 ? 3 : (storeys < 1 ? 1 : storeys);
    var storeyMult = (complexityCfg.storeyMultiplier && complexityCfg.storeyMultiplier[storeyKey]) || 1;
    var occupancyMult = input.occupancy === "occupied"
      ? (complexityCfg.occupiedMultiplier || 1)
      : (complexityCfg.vacantMultiplier || 1);

    var complexityFactor = siteAccessMult * storeyMult * occupancyMult;

    var min = baseMin * addOnFactor * complexityFactor;
    var max = baseMax * addOnFactor * complexityFactor;

    var contingencyPercent = Number(plannerConfig.contingencyPercent) || 0;
    max = max * (1 + contingencyPercent / 100);

    var roundTo = Number(plannerConfig.roundTo) > 0 ? Number(plannerConfig.roundTo) : 100;
    min = Math.max(0, Math.round(min / roundTo) * roundTo);
    max = Math.max(0, Math.round(max / roundTo) * roundTo);
    if (max < min) max = min;

    // Final safety net — never surface NaN/Infinity/negative figures to the UI.
    if (!isFinite(min) || min < 0) min = 0;
    if (!isFinite(max) || max < 0) max = 0;

    return {
      enabled: true,
      computable: true,
      currency: currency,
      min: min,
      max: max,
      unit: quantity.unit,
      finishLevelUsed: usedFinishLevel,
      contingencyPercent: contingencyPercent,
      addOnPercent: addOnPercent,
      isEstimate: true
    };
  }

  function formatCurrency(amount, currency) {
    var symbol = (currency && currency.symbol) || "$";
    var rounded = Math.round(amount || 0);
    var withThousands = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return symbol + withThousands;
  }

  /* -----------------------------------------------------------------
   * TRADE CHECKLIST
   * ------------------------------------------------------------- */
  function getTradeChecklist(input, plannerConfig) {
    var typeConfig = plannerConfig && plannerConfig.projectTypes && plannerConfig.projectTypes[input.projectType];
    var defaults = (typeConfig && typeConfig.defaultTrades) || [];
    var selected = TRADE_KEYS.filter(function (key) { return input[key]; });
    var merged = defaults.slice();
    selected.forEach(function (key) { if (merged.indexOf(key) === -1) merged.push(key); });
    return merged.map(function (key) {
      return {
        key: key,
        label: TRADE_LABELS[key],
        typical: defaults.indexOf(key) !== -1 && selected.indexOf(key) === -1
      };
    });
  }

  /* -----------------------------------------------------------------
   * ASSUMPTIONS
   * ------------------------------------------------------------- */
  function getAssumptions(input, plannerConfig, quantity) {
    var list = [];
    var base = (plannerConfig && plannerConfig.assumptionsBase) || [];
    list = list.concat(base);

    if (quantity && quantity.source === "dimensions") {
      list.push("Area was calculated as length × width from the dimensions you entered; irregular shapes may differ from this estimate.");
    }
    if (input.finishLevel === "Custom") {
      list.push("A \"Custom\" finish level cannot be priced from standard rate bands — a site consultation is required to quote accurately.");
    }
    if (!input.finishLevel) {
      list.push("No finish level was selected, so this estimate assumes a Standard finish.");
    }
    if (input.projectType === "boundary-wall") {
      list.push("Boundary wall pricing assumes standard block or brick construction to a typical residential height unless otherwise noted.");
    }
    return list;
  }

  /* -----------------------------------------------------------------
   * MISSING INFORMATION
   * ------------------------------------------------------------- */
  function getMissingInfo(input) {
    var missing = [];
    var hasArea = parsePositiveNumber(input.totalFloorArea) !== null;
    var hasDims = parsePositiveNumber(input.lengthM) !== null && parsePositiveNumber(input.widthM) !== null;
    if (!hasArea && !hasDims) missing.push("Total floor area or project dimensions");
    if (!input.projectType) missing.push("Project type");
    if (!input.finishLevel) missing.push("Preferred finish level");
    if (!input.siteAccess) missing.push("Site access conditions");
    if (!input.occupancy) missing.push("Whether the property is occupied or vacant during works");
    if (!input.suburb) missing.push("Suburb / project location");
    if (!input.preferredStartDate) missing.push("Preferred start date");
    if (!input.customerName) missing.push("Your name");
    if (!input.customerContact) missing.push("A phone number or email address to reach you on");
    return missing;
  }

  /* -----------------------------------------------------------------
   * PHOTO CHECKLIST
   * ------------------------------------------------------------- */
  function getPhotoChecklist(input, plannerConfig) {
    var checklists = (plannerConfig && plannerConfig.photoChecklists) || {};
    return checklists[input.projectType] || GENERIC_PHOTO_CHECKLIST;
  }

  /* -----------------------------------------------------------------
   * SITE INSPECTION RECOMMENDATION
   * ------------------------------------------------------------- */
  function getSiteInspectionRecommendation(input, complexity, budget) {
    var highValueTypes = ["home-extension", "new-build", "commercial-renovation"];
    var recommended =
      highValueTypes.indexOf(input.projectType) !== -1 ||
      !!input.structuralAlterations ||
      complexity.level === "High" ||
      (budget && budget.computable === false);

    var reason = recommended
      ? "A free site inspection is recommended for this project so we can confirm access, structural conditions and an accurate quotation."
      : "A site inspection is optional for a project of this scope, but available on request before you commit to a quotation.";

    return { recommended: recommended, reason: reason };
  }

  /* -----------------------------------------------------------------
   * SUMMARY TEXT (used by copy / print / download / WhatsApp / email)
   * ------------------------------------------------------------- */
  function buildSummary(input, result, businessConfig) {
    var lines = [];
    var businessName = (businessConfig && businessConfig.name) || "this business";
    lines.push("RENOVATION SCOPE & BUDGET SUMMARY — " + businessName);
    lines.push("Project: " + (input.projectName || "(untitled project)"));
    lines.push("Type: " + (result.projectTypeLabel || input.projectType || "Not specified"));
    lines.push("Suburb: " + (input.suburb || "Not specified"));

    if (result.quantity) {
      lines.push("Measured area: " + result.quantity.value + " " + (result.quantity.unit === "linear-meter" ? "linear m" : "m²"));
    } else {
      lines.push("Measured area: not enough information provided");
    }

    lines.push("Finish level: " + (input.finishLevel || "Not specified"));
    lines.push("Storeys: " + (input.numberOfStoreys || "1") + " | Rooms: " + (input.numberOfRooms || "n/a"));
    lines.push("Site access: " + (input.siteAccess || "Not specified") + " | Occupancy: " + (input.occupancy || "Not specified"));

    var budget = result.budget;
    if (!budget || budget.enabled === false) {
      lines.push("Budget estimate: disabled for this demo — contact us for a custom quotation.");
    } else if (!budget.computable) {
      lines.push("Budget estimate: " + budget.reason);
    } else {
      lines.push("Preliminary budget range: " + formatCurrency(budget.min, budget.currency) + " – " + formatCurrency(budget.max, budget.currency) + " (includes a " + budget.contingencyPercent + "% contingency allowance on the upper figure)");
    }

    lines.push("Complexity: " + result.complexity.level);

    if (result.tradeChecklist.length) {
      lines.push("Trades involved: " + result.tradeChecklist.map(function (t) { return t.label; }).join(", "));
    }

    if (result.missingInfo.length) {
      lines.push("Still needed: " + result.missingInfo.join("; "));
    }

    lines.push("Site inspection: " + (result.siteInspection.recommended ? "Recommended" : "Optional"));

    if (input.additionalNotes) lines.push("Notes: " + input.additionalNotes);

    lines.push("Contact: " + (input.customerName || "Not specified") + " — " + (input.customerContact || "Not specified"));
    lines.push("Preferred start date: " + (input.preferredStartDate || "Not specified"));
    lines.push("");
    lines.push("This is a preliminary, non-binding estimate only. Actual costs depend on final drawings, materials, labour, approvals and site conditions. A site inspection may be required before a firm quotation can be issued.");

    return lines.join("\n");
  }

  /* -----------------------------------------------------------------
   * LINK BUILDERS (WhatsApp / email) — safe encoding, explicit-confirm only
   * ------------------------------------------------------------- */
  function buildWhatsAppUrl(phoneNumber, message) {
    var digits = String(phoneNumber || "").replace(/[^\d]/g, "");
    var url = "https://wa.me/" + digits;
    if (message) url += "?text=" + encodeURIComponent(message);
    return url;
  }

  function buildEmailUrl(email, subject, body) {
    var params = [];
    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body) params.push("body=" + encodeURIComponent(body));
    var query = params.length ? "?" + params.join("&") : "";
    return "mailto:" + encodeURIComponent(String(email || "")).replace(/%40/g, "@") + query;
  }

  /* -----------------------------------------------------------------
   * ORCHESTRATION
   * ------------------------------------------------------------- */
  function runPlanner(input, plannerConfig, businessConfig) {
    var typeConfig = plannerConfig && plannerConfig.projectTypes && plannerConfig.projectTypes[input.projectType];
    var quantity = computeQuantity(input, typeConfig || {});
    var complexity = computeComplexity(input);
    var budget = computeBudgetRange(input, plannerConfig, quantity, complexity);
    var tradeChecklist = getTradeChecklist(input, plannerConfig);
    var assumptions = getAssumptions(input, plannerConfig, quantity);
    var missingInfo = getMissingInfo(input);
    var photoChecklist = getPhotoChecklist(input, plannerConfig);
    var siteInspection = getSiteInspectionRecommendation(input, complexity, budget);

    var result = {
      projectTypeLabel: (typeConfig && typeConfig.label) || input.projectType,
      quantity: quantity,
      complexity: complexity,
      budget: budget,
      tradeChecklist: tradeChecklist,
      assumptions: assumptions,
      missingInfo: missingInfo,
      photoChecklist: photoChecklist,
      siteInspection: siteInspection
    };

    result.summary = buildSummary(input, result, businessConfig);
    return result;
  }

  return {
    PROJECT_TYPE_ORDER: PROJECT_TYPE_ORDER,
    TRADE_KEYS: TRADE_KEYS,
    TRADE_LABELS: TRADE_LABELS,
    defaultInput: defaultInput,
    resetInput: resetInput,
    parsePositiveNumber: parsePositiveNumber,
    computeQuantity: computeQuantity,
    computeComplexity: computeComplexity,
    computeBudgetRange: computeBudgetRange,
    formatCurrency: formatCurrency,
    getTradeChecklist: getTradeChecklist,
    getAssumptions: getAssumptions,
    getMissingInfo: getMissingInfo,
    getPhotoChecklist: getPhotoChecklist,
    getSiteInspectionRecommendation: getSiteInspectionRecommendation,
    buildSummary: buildSummary,
    buildWhatsAppUrl: buildWhatsAppUrl,
    buildEmailUrl: buildEmailUrl,
    runPlanner: runPlanner,
    isPlainObject: isPlainObject
  };
});
