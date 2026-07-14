/**
 * Laser Cut & Engraving Quote Planner — pure calculation engine.
 *
 * Every function here is a pure function of its arguments (no DOM, no
 * globals) so it can run identically in the browser (app.js wires it to
 * the form) and under Node's built-in test runner (tests/planner.test.js).
 * All rates, multipliers and copy live in the `plannerConfig` argument —
 * this module hardcodes no business-specific pricing.
 */
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.LaserQuotePlanner = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  // Linear unit -> centimetre conversion factors. Physical constants, not
  // business rates, so they live here rather than in site-config.js.
  var UNIT_TO_CM = { mm: 0.1, cm: 1, m: 100, inches: 2.54 };

  var FILE_TYPE_KEYS = ["fileTypeSvg", "fileTypeDxf", "fileTypeAi", "fileTypePdf", "fileTypePng", "fileTypeJpg", "fileTypeNone"];
  var FILE_TYPE_LABELS = {
    fileTypeSvg: "SVG", fileTypeDxf: "DXF", fileTypeAi: "AI", fileTypePdf: "PDF",
    fileTypePng: "PNG", fileTypeJpg: "JPG", fileTypeNone: "None yet"
  };

  var GENERIC_FILE_PREP_CHECKLIST = [
    "Confirm the file units match the physical dimensions you entered",
    "Separate cut lines and engrave lines onto different layers or colours",
    "Provide the highest-resolution artwork you have available"
  ];

  function isPlainObject(v) {
    return v !== null && typeof v === "object" && !Array.isArray(v);
  }

  /* -----------------------------------------------------------------
   * INPUT DEFAULTS + RESET
   * ------------------------------------------------------------- */
  function defaultInput() {
    var input = {
      customerName: "",
      email: "",
      phone: "",
      suburb: "",
      projectName: "",
      serviceType: "",
      material: "",
      materialThickness: "",
      width: "",
      height: "",
      units: "mm",
      quantity: "1",
      engravingArea: "",
      cutComplexity: "",
      fileReadiness: "",
      finish: "",
      deadline: "",
      delivery: "",
      notes: ""
    };
    FILE_TYPE_KEYS.forEach(function (key) { input[key] = false; });
    return input;
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

  function parsePositiveInt(value) {
    var n = parsePositiveNumber(value);
    if (n === null) return null;
    n = Math.floor(n);
    return n >= 1 ? n : null;
  }

  /* -----------------------------------------------------------------
   * QUANTITY
   * ------------------------------------------------------------- */
  function computeQuantity(input) {
    return parsePositiveInt(input.quantity);
  }

  /* -----------------------------------------------------------------
   * AREA (per-piece, in cm² / m², from width x height x units)
   * ------------------------------------------------------------- */
  function unitFactor(units) {
    return UNIT_TO_CM[units] || UNIT_TO_CM.mm;
  }

  function computeArea(input) {
    var width = parsePositiveNumber(input.width);
    var height = parsePositiveNumber(input.height);
    if (width === null || height === null) return null;
    var factor = unitFactor(input.units);
    var widthCm = width * factor;
    var heightCm = height * factor;
    var cm2 = round2(widthCm * heightCm);
    return { cm2: cm2, m2: round4(cm2 / 10000), unit: input.units || "mm" };
  }

  /** Optional engraving area, entered in the same chosen unit² as width/height. */
  function computeEngravingArea(input) {
    var raw = parsePositiveNumber(input.engravingArea);
    if (raw === null) return null;
    var factor = unitFactor(input.units);
    var cm2 = round2(raw * factor * factor);
    return { cm2: cm2, m2: round4(cm2 / 10000), unit: input.units || "mm" };
  }

  function round2(n) { return Math.round(n * 100) / 100; }
  function round4(n) { return Math.round(n * 10000) / 10000; }

  /* -----------------------------------------------------------------
   * THICKNESS BAND
   * ------------------------------------------------------------- */
  function getThicknessBand(input, plannerConfig) {
    var bands = (plannerConfig && plannerConfig.thicknessBands) || [];
    var thicknessMm = parsePositiveNumber(input.materialThickness);
    if (thicknessMm === null || !bands.length) {
      return { multiplier: 1, label: "Not specified (assumed standard)", provided: false };
    }
    for (var i = 0; i < bands.length; i++) {
      if (thicknessMm <= bands[i].maxMm) {
        return { multiplier: Number(bands[i].multiplier) || 1, label: bands[i].label, provided: true };
      }
    }
    var last = bands[bands.length - 1];
    return { multiplier: (last && Number(last.multiplier)) || 1, label: (last && last.label) || "Over standard range", provided: true };
  }

  /* -----------------------------------------------------------------
   * COMPLEXITY
   * ------------------------------------------------------------- */
  function computeComplexity(input, plannerConfig) {
    var score = 0;
    var reasons = [];

    var complexityScores = { "simple-outline": 0, "moderate-detail": 1, "intricate-detail": 2, "nested-parts": 3 };
    if (input.cutComplexity && complexityScores[input.cutComplexity] !== undefined) {
      score += complexityScores[input.cutComplexity];
      if (input.cutComplexity !== "simple-outline") reasons.push("Cut complexity: " + input.cutComplexity.replace(/-/g, " "));
    }

    var serviceCfg = plannerConfig && plannerConfig.serviceTypes && plannerConfig.serviceTypes[input.serviceType];
    if (serviceCfg && serviceCfg.involvesCutting && serviceCfg.involvesEngraving) {
      score += 1;
      reasons.push("Combined cutting and engraving job");
    }

    var quantity = computeQuantity(input);
    if (quantity !== null && quantity > 25) {
      score += 1;
      reasons.push("Larger production quantity (" + quantity + ")");
    }

    if (input.finish === "assembled") {
      score += 1;
      reasons.push("Assembly required");
    }

    if (input.material === "anodised-aluminium" || input.material === "stainless-steel") {
      score += 2;
      reasons.push("Metal marking requires different machine setup");
    }

    var level = score <= 1 ? "Low" : score <= 4 ? "Medium" : "High";
    return { level: level, score: score, reasons: reasons };
  }

  /* -----------------------------------------------------------------
   * BUDGET RANGE
   * ------------------------------------------------------------- */
  function computeBudgetRange(input, plannerConfig, area, quantity, engravingArea) {
    var currency = (plannerConfig && plannerConfig.currency) || { code: "USD", symbol: "$", locale: "en-US" };

    if (!plannerConfig || plannerConfig.budgetEnabled === false) {
      return { enabled: false, currency: currency };
    }

    if (!area || !isFinite(area.cm2) || area.cm2 <= 0) {
      return {
        enabled: true,
        computable: false,
        currency: currency,
        reason: "Enter width, height and units to calculate a budget range."
      };
    }

    if (!quantity || quantity <= 0) {
      return {
        enabled: true,
        computable: false,
        currency: currency,
        reason: "Enter a quantity of 1 or more to calculate a budget range."
      };
    }

    var materialCfg = plannerConfig.materials && plannerConfig.materials[input.material];
    if (!materialCfg) {
      return {
        enabled: true,
        computable: false,
        currency: currency,
        reason: "Select a material to calculate a budget range."
      };
    }

    var rateMin = Number(materialCfg.rateMinPerCm2) || 0;
    var rateMax = Number(materialCfg.rateMaxPerCm2) || 0;
    if (rateMax < rateMin) { var tmp = rateMax; rateMax = rateMin; rateMin = tmp; }

    var thickness = getThicknessBand(input, plannerConfig);

    var complexityMultipliers = (plannerConfig.cutComplexityMultiplier) || {};
    var complexityMult = complexityMultipliers[input.cutComplexity];
    if (typeof complexityMult !== "number" || !isFinite(complexityMult) || complexityMult <= 0) complexityMult = 1;

    var finishMultipliers = plannerConfig.finishMultiplier || {};
    var finishMult = finishMultipliers[input.finish];
    var usedFinish = input.finish;
    if (typeof finishMult !== "number" || !isFinite(finishMult) || finishMult <= 0) {
      finishMult = 1;
      usedFinish = "Raw edge (default — no finish selected)";
    }

    var perPieceMin = area.cm2 * rateMin * thickness.multiplier * complexityMult * finishMult;
    var perPieceMax = area.cm2 * rateMax * thickness.multiplier * complexityMult * finishMult;

    var serviceCfg = plannerConfig.serviceTypes && plannerConfig.serviceTypes[input.serviceType];
    var engraveRate = Number(materialCfg.engraveRatePerCm2) || 0;
    var involvesEngraving = !!(serviceCfg && serviceCfg.involvesEngraving);
    if (involvesEngraving || engravingArea) {
      var engraveCm2 = engravingArea && engravingArea.cm2 > 0 ? engravingArea.cm2 : area.cm2;
      var engraveCost = engraveCm2 * engraveRate;
      perPieceMin += engraveCost;
      perPieceMax += engraveCost;
    }

    var totalMin = perPieceMin * quantity;
    var totalMax = perPieceMax * quantity;

    var contingencyPercent = Number(plannerConfig.contingencyPercent) || 0;
    totalMax = totalMax * (1 + contingencyPercent / 100);

    var roundTo = Number(plannerConfig.roundTo) > 0 ? Number(plannerConfig.roundTo) : 10;
    var min = Math.max(0, Math.round(totalMin / roundTo) * roundTo);
    var max = Math.max(0, Math.round(totalMax / roundTo) * roundTo);
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
      finishUsed: usedFinish,
      thicknessBandLabel: thickness.label,
      contingencyPercent: contingencyPercent,
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
   * SERVICE CHECKLIST
   * ------------------------------------------------------------- */
  function getServiceChecklist(input, plannerConfig) {
    var serviceCfg = plannerConfig && plannerConfig.serviceTypes && plannerConfig.serviceTypes[input.serviceType];
    return (serviceCfg && serviceCfg.defaultChecklist) ? serviceCfg.defaultChecklist.slice() : [];
  }

  /* -----------------------------------------------------------------
   * FILE PREPARATION CHECKLIST
   * ------------------------------------------------------------- */
  function getFilePrepChecklist(input, plannerConfig) {
    var checklists = (plannerConfig && plannerConfig.filePrepChecklists) || {};
    return checklists[input.fileReadiness] || GENERIC_FILE_PREP_CHECKLIST;
  }

  function getSelectedFileTypes(input) {
    return FILE_TYPE_KEYS.filter(function (key) { return input[key]; }).map(function (key) { return FILE_TYPE_LABELS[key]; });
  }

  /* -----------------------------------------------------------------
   * DESIGN-SUPPORT WARNING
   * ------------------------------------------------------------- */
  function getDesignSupportWarning(input, plannerConfig) {
    if (!input.fileReadiness || input.fileReadiness === "vector-ready") {
      return { warning: false, message: null };
    }
    var message = (plannerConfig && plannerConfig.designSupportMessage) ||
      "No cut-ready vector file was supplied — design assistance may be needed before production can begin.";
    return { warning: true, message: message };
  }

  /* -----------------------------------------------------------------
   * ASSUMPTIONS
   * ------------------------------------------------------------- */
  function getAssumptions(input, plannerConfig, area, thickness) {
    var list = [];
    var base = (plannerConfig && plannerConfig.assumptionsBase) || [];
    list = list.concat(base);

    if (!thickness.provided) {
      list.push("No material thickness was provided, so this estimate assumes the " + thickness.label.toLowerCase() + " cutting band.");
    }
    if (!input.finish) {
      list.push("No finish was selected, so this estimate assumes a raw-edge finish.");
    }
    if (!input.cutComplexity) {
      list.push("No cut complexity was selected, so this estimate assumes a simple outline.");
    }
    if (area && area.unit === "inches") {
      list.push("Dimensions were converted from inches to centimetres for rate calculation.");
    }
    return list;
  }

  /* -----------------------------------------------------------------
   * MISSING INFORMATION
   * ------------------------------------------------------------- */
  function getMissingInfo(input) {
    var missing = [];
    if (!parsePositiveNumber(input.width) || !parsePositiveNumber(input.height)) missing.push("Project width and height");
    if (!computeQuantity(input)) missing.push("Quantity (1 or more)");
    if (!input.serviceType) missing.push("Service type");
    if (!input.material) missing.push("Material");
    if (!input.cutComplexity) missing.push("Cut complexity");
    if (!input.fileReadiness) missing.push("File readiness");
    if (!input.finish) missing.push("Finish");
    if (!input.deadline) missing.push("Deadline");
    if (!input.customerName) missing.push("Your name");
    if (!input.email && !input.phone) missing.push("An email address or phone number to reach you on");
    if (!input.suburb) missing.push("Suburb / city");
    return missing;
  }

  /* -----------------------------------------------------------------
   * NEXT-STEP RECOMMENDATION
   * ------------------------------------------------------------- */
  function getNextStepRecommendation(designSupport, complexity) {
    if (designSupport.warning) {
      return "Design consultation recommended — a cut-ready file is needed before a firm quotation can be issued.";
    }
    if (complexity.level === "High") {
      return "A detailed file review is recommended given the complexity of this job before production is scheduled.";
    }
    return "Ready for file review and material nesting — final pricing is confirmed once your file is checked.";
  }

  /* -----------------------------------------------------------------
   * SUMMARY TEXT (used by copy / print / download / WhatsApp / email)
   * ------------------------------------------------------------- */
  function buildSummary(input, result, businessConfig, plannerConfig) {
    var lines = [];
    var businessName = (businessConfig && businessConfig.name) || "this business";
    lines.push("LASER CUT & ENGRAVING QUOTE SUMMARY — " + businessName);
    lines.push("Project: " + (input.projectName || "(untitled project)"));
    lines.push("Service: " + (result.serviceTypeLabel || input.serviceType || "Not specified"));
    lines.push("Material: " + (result.materialLabel || input.material || "Not specified"));
    lines.push("Thickness: " + (input.materialThickness ? input.materialThickness + "mm" : "Not specified"));

    if (result.area) {
      lines.push("Dimensions: " + input.width + " x " + input.height + " " + (input.units || "mm") + " (" + result.area.cm2 + " cm² per piece)");
    } else {
      lines.push("Dimensions: not enough information provided");
    }

    lines.push("Quantity: " + (result.quantity || "Not specified"));

    if (result.engravingArea) {
      lines.push("Engraving area: " + result.engravingArea.cm2 + " cm² per piece");
    }

    lines.push("Cut complexity: " + (input.cutComplexity || "Not specified"));
    lines.push("Finish: " + (input.finish || "Not specified"));
    lines.push("File readiness: " + (input.fileReadiness || "Not specified"));

    var fileTypes = getSelectedFileTypes(input);
    if (fileTypes.length) lines.push("File types available: " + fileTypes.join(", "));

    var budget = result.budget;
    if (!budget || budget.enabled === false) {
      lines.push("Budget estimate: disabled for this demo — contact us for a custom quotation.");
    } else if (!budget.computable) {
      lines.push("Budget estimate: " + budget.reason);
    } else {
      lines.push("Preliminary budget range: " + formatCurrency(budget.min, budget.currency) + " – " + formatCurrency(budget.max, budget.currency) + " (includes a " + budget.contingencyPercent + "% contingency allowance on the upper figure)");
    }

    lines.push("Complexity: " + result.complexity.level);

    if (result.serviceChecklist.length) {
      lines.push("Service checklist: " + result.serviceChecklist.join("; "));
    }

    if (result.designSupport.warning) {
      lines.push("Design support: " + result.designSupport.message);
    }

    if (result.missingInfo.length) {
      lines.push("Still needed: " + result.missingInfo.join("; "));
    }

    lines.push("Next step: " + result.nextStep);

    if (input.deadline) lines.push("Deadline: " + input.deadline);
    if (input.delivery) lines.push("Delivery preference: " + input.delivery);
    if (input.notes) lines.push("Notes: " + input.notes);

    lines.push("Suburb / city: " + (input.suburb || "Not specified"));
    lines.push("Contact: " + (input.customerName || "Not specified") + " — " + (input.email || input.phone || "Not specified"));
    lines.push("");
    lines.push((plannerConfig && plannerConfig.designSupportMessageFooter) ||
      "The planner provides preliminary guidance only. Final pricing depends on file quality, machine setup, material availability, job complexity, finishing, quantity, labour, delivery and final review.");

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
    var serviceCfg = plannerConfig && plannerConfig.serviceTypes && plannerConfig.serviceTypes[input.serviceType];
    var materialCfg = plannerConfig && plannerConfig.materials && plannerConfig.materials[input.material];

    var area = computeArea(input);
    var engravingArea = computeEngravingArea(input);
    var quantity = computeQuantity(input);
    var thickness = getThicknessBand(input, plannerConfig);
    var complexity = computeComplexity(input, plannerConfig);
    var budget = computeBudgetRange(input, plannerConfig, area, quantity, engravingArea);
    var serviceChecklist = getServiceChecklist(input, plannerConfig);
    var filePrepChecklist = getFilePrepChecklist(input, plannerConfig);
    var designSupport = getDesignSupportWarning(input, plannerConfig);
    var assumptions = getAssumptions(input, plannerConfig, area, thickness);
    var missingInfo = getMissingInfo(input);
    var nextStep = getNextStepRecommendation(designSupport, complexity);

    var result = {
      serviceTypeLabel: (serviceCfg && serviceCfg.label) || input.serviceType,
      materialLabel: (materialCfg && materialCfg.label) || input.material,
      area: area,
      engravingArea: engravingArea,
      quantity: quantity,
      thickness: thickness,
      complexity: complexity,
      budget: budget,
      serviceChecklist: serviceChecklist,
      filePrepChecklist: filePrepChecklist,
      designSupport: designSupport,
      assumptions: assumptions,
      missingInfo: missingInfo,
      nextStep: nextStep
    };

    result.summary = buildSummary(input, result, businessConfig, plannerConfig);
    return result;
  }

  return {
    FILE_TYPE_KEYS: FILE_TYPE_KEYS,
    FILE_TYPE_LABELS: FILE_TYPE_LABELS,
    defaultInput: defaultInput,
    resetInput: resetInput,
    parsePositiveNumber: parsePositiveNumber,
    parsePositiveInt: parsePositiveInt,
    computeQuantity: computeQuantity,
    computeArea: computeArea,
    computeEngravingArea: computeEngravingArea,
    getThicknessBand: getThicknessBand,
    computeComplexity: computeComplexity,
    computeBudgetRange: computeBudgetRange,
    formatCurrency: formatCurrency,
    getServiceChecklist: getServiceChecklist,
    getFilePrepChecklist: getFilePrepChecklist,
    getSelectedFileTypes: getSelectedFileTypes,
    getDesignSupportWarning: getDesignSupportWarning,
    getAssumptions: getAssumptions,
    getMissingInfo: getMissingInfo,
    getNextStepRecommendation: getNextStepRecommendation,
    buildSummary: buildSummary,
    buildWhatsAppUrl: buildWhatsAppUrl,
    buildEmailUrl: buildEmailUrl,
    runPlanner: runPlanner,
    isPlainObject: isPlainObject
  };
});
