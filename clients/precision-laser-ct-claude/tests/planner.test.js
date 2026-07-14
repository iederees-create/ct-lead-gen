/**
 * Tests for planner.js — run with: node --test tests/
 * Uses Node's built-in test runner (node:test) and assert — no external
 * dependencies required, consistent with this repo's plain static-site
 * tooling.
 */
"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");
const Planner = require("../planner.js");

const CFG = {
  budgetEnabled: true,
  currency: { code: "ZAR", symbol: "R", locale: "en-ZA" },
  contingencyPercent: 10,
  roundTo: 10,
  materials: {
    "acrylic": { label: "Acrylic", rateMinPerCm2: 1, rateMaxPerCm2: 2, engraveRatePerCm2: 0.5 },
    "plywood": { label: "Plywood", rateMinPerCm2: 0.5, rateMaxPerCm2: 1, engraveRatePerCm2: 0.3 }
  },
  serviceTypes: {
    "cutting": { label: "Laser Cutting", involvesCutting: true, involvesEngraving: false, defaultChecklist: ["Nest parts to minimise waste"] },
    "engraving": { label: "Laser Engraving", involvesCutting: false, involvesEngraving: true, defaultChecklist: ["Test engrave on scrap material"] },
    "cutting-engraving": { label: "Cutting & Engraving", involvesCutting: true, involvesEngraving: true, defaultChecklist: ["Confirm layer separation"] }
  },
  cutComplexityMultiplier: { "simple-outline": 1.0, "moderate-detail": 1.15, "intricate-detail": 1.35, "nested-parts": 1.5 },
  finishMultiplier: { "raw-edge": 1.0, "polished-edge": 1.2, "painted": 1.3, "assembled": 1.4, "packaged": 1.15 },
  thicknessBands: [
    { maxMm: 3, multiplier: 1.0, label: "Up to 3mm" },
    { maxMm: 6, multiplier: 1.15, label: "3–6mm" },
    { maxMm: Infinity, multiplier: 1.6, label: "Over 6mm" }
  ],
  filePrepChecklists: {
    "vector-ready": ["Confirm file units"],
    "no-file-yet": ["A cut-ready vector file is required"]
  },
  designSupportMessage: "No cut-ready vector file was supplied.",
  assumptionsBase: ["Rates assume standard material stock."]
};

function baseInput(overrides) {
  return Object.assign(Planner.defaultInput(), overrides || {});
}

test("computeArea: multiplies width x height and converts mm to cm2", () => {
  const a = Planner.computeArea(baseInput({ width: "100", height: "50", units: "mm" }));
  assert.equal(a.cm2, 50); // 10cm x 5cm = 50cm2
});

test("computeArea: converts cm units directly (no scaling)", () => {
  const a = Planner.computeArea(baseInput({ width: "10", height: "5", units: "cm" }));
  assert.equal(a.cm2, 50);
});

test("computeArea: converts m units to cm2", () => {
  const a = Planner.computeArea(baseInput({ width: "1", height: "0.5", units: "m" }));
  assert.equal(a.cm2, 5000); // 100cm x 50cm
});

test("computeArea: converts inches to cm2", () => {
  const a = Planner.computeArea(baseInput({ width: "10", height: "10", units: "inches" }));
  // 10in = 25.4cm, area = 25.4 * 25.4 = 645.16
  assert.equal(a.cm2, 645.16);
});

test("computeArea: returns null when width or height missing", () => {
  assert.equal(Planner.computeArea(baseInput({ width: "10" })), null);
  assert.equal(Planner.computeArea(baseInput()), null);
});

test("computeArea: zero and negative dimensions are rejected, not silently zeroed", () => {
  assert.equal(Planner.computeArea(baseInput({ width: "0", height: "5" })), null);
  assert.equal(Planner.computeArea(baseInput({ width: "-4", height: "5" })), null);
});

test("computeArea: non-numeric input is rejected", () => {
  assert.equal(Planner.computeArea(baseInput({ width: "abc", height: "5" })), null);
});

test("computeArea: unknown units default to mm", () => {
  const a = Planner.computeArea(baseInput({ width: "100", height: "50", units: "furlongs" }));
  assert.equal(a.cm2, 50);
});

test("computeQuantity: parses positive integers, rejects zero/negative/non-numeric", () => {
  assert.equal(Planner.computeQuantity(baseInput({ quantity: "5" })), 5);
  assert.equal(Planner.computeQuantity(baseInput({ quantity: "0" })), null);
  assert.equal(Planner.computeQuantity(baseInput({ quantity: "-3" })), null);
  assert.equal(Planner.computeQuantity(baseInput({ quantity: "abc" })), null);
  assert.equal(Planner.computeQuantity(baseInput({ quantity: "2.9" })), 2); // floors fractional quantity
});

test("computeBudgetRange: full happy path produces a min <= max range with no NaN/Infinity", () => {
  const input = baseInput({ material: "acrylic", width: "10", height: "10", units: "cm", quantity: "2", cutComplexity: "simple-outline", finish: "raw-edge" });
  const area = Planner.computeArea(input);
  const quantity = Planner.computeQuantity(input);
  const budget = Planner.computeBudgetRange(input, CFG, area, quantity, null);

  assert.equal(budget.enabled, true);
  assert.equal(budget.computable, true);
  assert.ok(Number.isFinite(budget.min));
  assert.ok(Number.isFinite(budget.max));
  assert.ok(budget.min >= 0);
  assert.ok(budget.max >= budget.min);
});

test("computeBudgetRange: thickness bands increase the range (thicker = more expensive)", () => {
  function rangeFor(thickness) {
    const input = baseInput({ material: "acrylic", width: "10", height: "10", units: "cm", quantity: "1", materialThickness: thickness, finish: "raw-edge", cutComplexity: "simple-outline" });
    const area = Planner.computeArea(input);
    const quantity = Planner.computeQuantity(input);
    return Planner.computeBudgetRange(input, CFG, area, quantity, null);
  }
  const thin = rangeFor("2");
  const thick = rangeFor("10");
  assert.ok(thick.max > thin.max);
});

test("computeBudgetRange: cut complexity multipliers change the range (nested-parts > simple-outline)", () => {
  function rangeFor(complexity) {
    const input = baseInput({ material: "acrylic", width: "10", height: "10", units: "cm", quantity: "1", cutComplexity: complexity, finish: "raw-edge" });
    const area = Planner.computeArea(input);
    const quantity = Planner.computeQuantity(input);
    return Planner.computeBudgetRange(input, CFG, area, quantity, null);
  }
  const simple = rangeFor("simple-outline");
  const nested = rangeFor("nested-parts");
  assert.ok(nested.max > simple.max);
});

test("computeBudgetRange: engraving service type adds an engrave surcharge", () => {
  function rangeFor(serviceType) {
    const input = baseInput({ serviceType: serviceType, material: "acrylic", width: "10", height: "10", units: "cm", quantity: "1", finish: "raw-edge", cutComplexity: "simple-outline" });
    const area = Planner.computeArea(input);
    const quantity = Planner.computeQuantity(input);
    return Planner.computeBudgetRange(input, CFG, area, quantity, null);
  }
  const cuttingOnly = rangeFor("cutting");
  const withEngraving = rangeFor("cutting-engraving");
  assert.ok(withEngraving.max > cuttingOnly.max);
});

test("computeBudgetRange: quantity multiplies the total range", () => {
  function rangeFor(qty) {
    const input = baseInput({ material: "acrylic", width: "10", height: "10", units: "cm", quantity: qty, finish: "raw-edge", cutComplexity: "simple-outline" });
    const area = Planner.computeArea(input);
    const quantity = Planner.computeQuantity(input);
    return Planner.computeBudgetRange(input, CFG, area, quantity, null);
  }
  const one = rangeFor("1");
  const five = rangeFor("5");
  assert.ok(five.max > one.max);
});

test("computeBudgetRange: missing area returns computable=false, never NaN/negative", () => {
  const input = baseInput({ material: "acrylic", quantity: "1" });
  const budget = Planner.computeBudgetRange(input, CFG, null, 1, null);
  assert.equal(budget.enabled, true);
  assert.equal(budget.computable, false);
  assert.ok(budget.reason.length > 0);
});

test("computeBudgetRange: missing quantity returns computable=false", () => {
  const input = baseInput({ material: "acrylic", width: "10", height: "10" });
  const area = Planner.computeArea(input);
  const budget = Planner.computeBudgetRange(input, CFG, area, null, null);
  assert.equal(budget.computable, false);
});

test("computeBudgetRange: unknown material returns computable=false", () => {
  const input = baseInput({ material: "unobtainium", width: "10", height: "10", quantity: "1" });
  const area = Planner.computeArea(input);
  const budget = Planner.computeBudgetRange(input, CFG, area, 1, null);
  assert.equal(budget.computable, false);
});

test("computeBudgetRange: disabled-budget mode returns enabled=false with no numeric fields required", () => {
  const disabledCfg = Object.assign({}, CFG, { budgetEnabled: false });
  const input = baseInput({ material: "acrylic", width: "10", height: "10", quantity: "1" });
  const area = Planner.computeArea(input);
  const budget = Planner.computeBudgetRange(input, disabledCfg, area, 1, null);
  assert.equal(budget.enabled, false);
  assert.equal(budget.min, undefined);
  assert.equal(budget.max, undefined);
});

test("computeBudgetRange: never produces NaN, Infinity or negative figures across a sweep of edge inputs", () => {
  const edgeCases = [
    { width: "0", height: "10" },
    { width: "-5", height: "10" },
    { width: "99999999", height: "99999999" },
    { width: "0.0001", height: "0.0001" },
    { quantity: "0" },
    { quantity: "-5" }
  ];
  edgeCases.forEach((overrides) => {
    const input = baseInput(Object.assign({ material: "acrylic", width: "10", height: "10", quantity: "1", finish: "raw-edge" }, overrides));
    const area = Planner.computeArea(input);
    const quantity = Planner.computeQuantity(input);
    const budget = Planner.computeBudgetRange(input, CFG, area, quantity, null);
    if (budget.computable) {
      assert.ok(Number.isFinite(budget.min), "min must be finite for " + JSON.stringify(overrides));
      assert.ok(Number.isFinite(budget.max), "max must be finite for " + JSON.stringify(overrides));
      assert.ok(budget.min >= 0, "min must not be negative for " + JSON.stringify(overrides));
      assert.ok(budget.max >= 0, "max must not be negative for " + JSON.stringify(overrides));
    }
  });
});

test("computeComplexity: accumulates score from cut complexity, service type, quantity, finish and material", () => {
  const low = Planner.computeComplexity(baseInput({ cutComplexity: "simple-outline", quantity: "1" }), CFG);
  const high = Planner.computeComplexity(baseInput({
    cutComplexity: "nested-parts", serviceType: "cutting-engraving", quantity: "50", finish: "assembled", material: "anodised-aluminium"
  }), CFG);
  assert.equal(low.level, "Low");
  assert.equal(high.level, "High");
  assert.ok(high.score > low.score);
});

test("getServiceChecklist: returns the configured checklist for the selected service type", () => {
  const checklist = Planner.getServiceChecklist(baseInput({ serviceType: "engraving" }), CFG);
  assert.deepEqual(checklist, ["Test engrave on scrap material"]);
});

test("getServiceChecklist: returns empty array for unknown/unset service type", () => {
  assert.deepEqual(Planner.getServiceChecklist(baseInput(), CFG), []);
});

test("getFilePrepChecklist: returns the checklist matching file readiness, falls back to generic", () => {
  assert.deepEqual(Planner.getFilePrepChecklist(baseInput({ fileReadiness: "vector-ready" }), CFG), ["Confirm file units"]);
  const fallback = Planner.getFilePrepChecklist(baseInput({ fileReadiness: "" }), CFG);
  assert.ok(fallback.length > 0);
});

test("getDesignSupportWarning: warns when file readiness is anything other than vector-ready", () => {
  assert.equal(Planner.getDesignSupportWarning(baseInput({ fileReadiness: "vector-ready" }), CFG).warning, false);
  assert.equal(Planner.getDesignSupportWarning(baseInput({ fileReadiness: "no-file-yet" }), CFG).warning, true);
  assert.equal(Planner.getDesignSupportWarning(baseInput({ fileReadiness: "image-only" }), CFG).warning, true);
  assert.equal(Planner.getDesignSupportWarning(baseInput({}), CFG).warning, false); // not yet answered != warning
});

test("getMissingInfo: flags absent fields and clears once provided", () => {
  const empty = Planner.getMissingInfo(baseInput({ quantity: "" }));
  assert.ok(empty.length > 0);

  const complete = Planner.getMissingInfo(baseInput({
    width: "10", height: "10", quantity: "2", serviceType: "cutting", material: "acrylic",
    cutComplexity: "simple-outline", fileReadiness: "vector-ready", finish: "raw-edge",
    deadline: "2026-08-01", customerName: "A Buyer", email: "a@example.com", suburb: "Woodstock"
  }));
  assert.equal(complete.length, 0);
});

test("getMissingInfo: phone alone satisfies the contact-method requirement (email not mandatory)", () => {
  const missing = Planner.getMissingInfo(baseInput({
    width: "10", height: "10", quantity: "2", serviceType: "cutting", material: "acrylic",
    cutComplexity: "simple-outline", fileReadiness: "vector-ready", finish: "raw-edge",
    deadline: "2026-08-01", customerName: "A Buyer", phone: "0821234567", suburb: "Woodstock"
  }));
  assert.equal(missing.length, 0);
});

test("buildSummary: generates a non-empty summary including project name and disclaimer language", () => {
  const input = baseInput({ projectName: "Test Sign", serviceType: "cutting", material: "acrylic", width: "10", height: "10", quantity: "1" });
  const result = Planner.runPlanner(input, CFG, { name: "Precision Laser Works" });
  assert.ok(result.summary.includes("Test Sign"));
  assert.ok(result.summary.includes("preliminary"));
  assert.ok(result.summary.length > 0);
});

test("runPlanner: disabled budget mode still produces a full summary without numeric range or NaN/Infinity/undefined", () => {
  const disabledCfg = Object.assign({}, CFG, { budgetEnabled: false });
  const input = baseInput({ projectName: "Test Keyring", serviceType: "cutting", material: "acrylic", width: "5", height: "5", quantity: "10" });
  const result = Planner.runPlanner(input, disabledCfg, { name: "Precision Laser Works" });
  assert.equal(result.budget.enabled, false);
  assert.ok(result.summary.includes("disabled for this demo"));
  assert.ok(!/NaN|Infinity|undefined/.test(result.summary));
});

test("buildWhatsAppUrl: strips non-digits from phone number and URL-encodes the message", () => {
  const url = Planner.buildWhatsAppUrl("+27 (83) 555-0164", "Hi there! Budget: R1,000 & up?");
  assert.equal(url.indexOf("https://wa.me/27835550164?text="), 0);
  assert.ok(url.includes(encodeURIComponent("Hi there! Budget: R1,000 & up?")));
  assert.ok(!url.includes(" "));
  assert.ok(!url.includes("&up")); // raw "&" must not appear unescaped
});

test("buildWhatsAppUrl: omits the text param when no message is given", () => {
  const url = Planner.buildWhatsAppUrl("0835550164", "");
  assert.equal(url, "https://wa.me/0835550164");
});

test("buildEmailUrl: URL-encodes subject and body and preserves a valid mailto address", () => {
  const url = Planner.buildEmailUrl("hello@example.com", "Quote Request & Details", "Line one\nLine two");
  assert.equal(url.indexOf("mailto:hello@example.com?"), 0);
  assert.ok(url.includes("subject=" + encodeURIComponent("Quote Request & Details")));
  assert.ok(url.includes("body=" + encodeURIComponent("Line one\nLine two")));
});

test("resetInput: returns a fresh default object each call, independent of prior mutation", () => {
  const first = Planner.resetInput();
  first.projectName = "Mutated";
  first.fileTypeSvg = true;
  const second = Planner.resetInput();
  assert.equal(second.projectName, "");
  assert.equal(second.fileTypeSvg, false);
  assert.notEqual(first, second);
});

test("parsePositiveNumber: rejects NaN, Infinity, zero and negative values", () => {
  assert.equal(Planner.parsePositiveNumber("not-a-number"), null);
  assert.equal(Planner.parsePositiveNumber("Infinity"), null);
  assert.equal(Planner.parsePositiveNumber("0"), null);
  assert.equal(Planner.parsePositiveNumber("-5"), null);
  assert.equal(Planner.parsePositiveNumber(""), null);
  assert.equal(Planner.parsePositiveNumber("12.5"), 12.5);
});

test("parsePositiveInt: floors fractional values and rejects sub-1 values", () => {
  assert.equal(Planner.parsePositiveInt("3.9"), 3);
  assert.equal(Planner.parsePositiveInt("0.5"), null);
  assert.equal(Planner.parsePositiveInt("-1"), null);
});

test("getSelectedFileTypes: returns labels only for checked file types", () => {
  const input = baseInput({ fileTypeSvg: true, fileTypeDxf: false, fileTypePdf: true });
  const types = Planner.getSelectedFileTypes(input);
  assert.deepEqual(types, ["SVG", "PDF"]);
});

test("getThicknessBand: falls back to 'not specified' when thickness omitted, never throws", () => {
  const band = Planner.getThicknessBand(baseInput({ materialThickness: "" }), CFG);
  assert.equal(band.provided, false);
  assert.equal(band.multiplier, 1);
});

test("getThicknessBand: selects the correct band for a boundary value and an over-range value", () => {
  const atBoundary = Planner.getThicknessBand(baseInput({ materialThickness: "3" }), CFG);
  assert.equal(atBoundary.multiplier, 1.0);
  const overRange = Planner.getThicknessBand(baseInput({ materialThickness: "50" }), CFG);
  assert.equal(overRange.multiplier, 1.6);
});

test("runPlanner + summary text supports copy/print/download workflows: summary is plain text with no HTML", () => {
  const input = baseInput({ projectName: "Test <script>alert(1)</script>", serviceType: "cutting", material: "acrylic", width: "10", height: "10", quantity: "1" });
  const result = Planner.runPlanner(input, CFG, { name: "Precision Laser Works" });
  // buildSummary is plain text (not rendered as HTML anywhere) — raw content is preserved as text
  assert.ok(result.summary.includes("Test <script>alert(1)</script>"));
  assert.equal(typeof result.summary, "string");
});
