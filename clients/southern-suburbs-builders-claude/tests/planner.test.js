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
  roundTo: 500,
  projectTypes: {
    "room-renovation": { label: "Room Renovation", unit: "sqm", rateMin: 4000, rateMax: 8000, defaultTrades: ["painting"] },
    "kitchen-renovation": { label: "Kitchen Renovation", unit: "sqm", rateMin: 10000, rateMax: 20000, defaultTrades: ["plumbing", "electrical"] },
    "boundary-wall": { label: "Boundary Wall", unit: "linear-meter", rateMin: 1000, rateMax: 2000, defaultTrades: [] }
  },
  finishMultipliers: { Essential: 0.8, Standard: 1, Premium: 1.4, Custom: 1.6 },
  tradeAddOnPercent: { demolition: 10, plumbing: 10, electrical: 10 },
  complexity: {
    siteAccessMultiplier: { easy: 1, moderate: 1.1, difficult: 1.2 },
    storeyMultiplier: { 1: 1, 2: 1.1, 3: 1.2 },
    occupiedMultiplier: 1.05,
    vacantMultiplier: 1
  },
  assumptionsBase: ["Estimates are preliminary."],
  photoChecklists: {}
};

function baseInput(overrides) {
  return Object.assign(Planner.defaultInput(), overrides || {});
}

test("computeQuantity: multiplies length x width when no explicit floor area", () => {
  const q = Planner.computeQuantity(baseInput({ lengthM: "4", widthM: "5" }), { unit: "sqm" });
  assert.equal(q.value, 20);
  assert.equal(q.unit, "sqm");
});

test("computeQuantity: prefers explicit totalFloorArea over dimensions", () => {
  const q = Planner.computeQuantity(baseInput({ lengthM: "4", widthM: "5", totalFloorArea: "30" }), { unit: "sqm" });
  assert.equal(q.value, 30);
  assert.equal(q.source, "totalFloorArea");
});

test("computeQuantity: linear-meter unit uses length only (boundary wall)", () => {
  const q = Planner.computeQuantity(baseInput({ lengthM: "12", widthM: "1.8" }), { unit: "linear-meter" });
  assert.equal(q.value, 12);
  assert.equal(q.unit, "linear-meter");
});

test("computeQuantity: returns null when no usable dimensions given", () => {
  assert.equal(Planner.computeQuantity(baseInput(), { unit: "sqm" }), null);
});

test("computeQuantity: zero and negative dimensions are rejected, not silently zeroed", () => {
  assert.equal(Planner.computeQuantity(baseInput({ lengthM: "0", widthM: "5" }), { unit: "sqm" }), null);
  assert.equal(Planner.computeQuantity(baseInput({ lengthM: "-4", widthM: "5" }), { unit: "sqm" }), null);
  assert.equal(Planner.computeQuantity(baseInput({ totalFloorArea: "-10" }), { unit: "sqm" }), null);
});

test("computeQuantity: non-numeric input is rejected", () => {
  assert.equal(Planner.computeQuantity(baseInput({ lengthM: "abc", widthM: "5" }), { unit: "sqm" }), null);
});

test("computeBudgetRange: full happy path produces a min <= max range with no NaN/Infinity", () => {
  const input = baseInput({
    projectType: "kitchen-renovation",
    totalFloorArea: "15",
    finishLevel: "Standard",
    siteAccess: "easy",
    occupancy: "vacant",
    numberOfStoreys: "1"
  });
  const quantity = Planner.computeQuantity(input, CFG.projectTypes["kitchen-renovation"]);
  const complexity = Planner.computeComplexity(input);
  const budget = Planner.computeBudgetRange(input, CFG, quantity, complexity);

  assert.equal(budget.enabled, true);
  assert.equal(budget.computable, true);
  assert.ok(Number.isFinite(budget.min));
  assert.ok(Number.isFinite(budget.max));
  assert.ok(budget.min >= 0);
  assert.ok(budget.max >= budget.min);
});

test("computeBudgetRange: finish multipliers change the range (Premium > Standard > Essential)", () => {
  function rangeFor(finishLevel) {
    const input = baseInput({ projectType: "room-renovation", totalFloorArea: "10", finishLevel: finishLevel });
    const quantity = Planner.computeQuantity(input, CFG.projectTypes["room-renovation"]);
    const complexity = Planner.computeComplexity(input);
    return Planner.computeBudgetRange(input, CFG, quantity, complexity);
  }
  const essential = rangeFor("Essential");
  const standard = rangeFor("Standard");
  const premium = rangeFor("Premium");
  assert.ok(essential.max < standard.max);
  assert.ok(standard.max < premium.max);
});

test("computeBudgetRange: selected trades increase the range via add-on percent", () => {
  const withoutTrades = baseInput({ projectType: "room-renovation", totalFloorArea: "10", finishLevel: "Standard" });
  const withTrades = baseInput({ projectType: "room-renovation", totalFloorArea: "10", finishLevel: "Standard", demolition: true, electrical: true });

  const qWithout = Planner.computeQuantity(withoutTrades, CFG.projectTypes["room-renovation"]);
  const qWith = Planner.computeQuantity(withTrades, CFG.projectTypes["room-renovation"]);
  const cWithout = Planner.computeComplexity(withoutTrades);
  const cWith = Planner.computeComplexity(withTrades);

  const rangeWithout = Planner.computeBudgetRange(withoutTrades, CFG, qWithout, cWithout);
  const rangeWith = Planner.computeBudgetRange(withTrades, CFG, qWith, cWith);

  assert.ok(rangeWith.max > rangeWithout.max);
});

test("computeBudgetRange: missing quantity returns computable=false, never NaN/negative", () => {
  const input = baseInput({ projectType: "room-renovation", finishLevel: "Standard" });
  const budget = Planner.computeBudgetRange(input, CFG, null, Planner.computeComplexity(input));
  assert.equal(budget.enabled, true);
  assert.equal(budget.computable, false);
  assert.equal(typeof budget.reason, "string");
  assert.ok(budget.reason.length > 0);
});

test("computeBudgetRange: unknown project type returns computable=false", () => {
  const input = baseInput({ projectType: "not-a-real-type", totalFloorArea: "10", finishLevel: "Standard" });
  const budget = Planner.computeBudgetRange(input, CFG, { value: 10, unit: "sqm" }, Planner.computeComplexity(input));
  assert.equal(budget.computable, false);
});

test("computeBudgetRange: disabled-budget mode returns enabled=false with no numeric fields required", () => {
  const disabledCfg = Object.assign({}, CFG, { budgetEnabled: false });
  const input = baseInput({ projectType: "room-renovation", totalFloorArea: "10", finishLevel: "Standard" });
  const budget = Planner.computeBudgetRange(input, disabledCfg, { value: 10, unit: "sqm" }, Planner.computeComplexity(input));
  assert.equal(budget.enabled, false);
  assert.equal(budget.min, undefined);
  assert.equal(budget.max, undefined);
});

test("computeBudgetRange: never produces NaN, Infinity or negative figures across a sweep of edge inputs", () => {
  const edgeCases = [
    { totalFloorArea: "0" },
    { totalFloorArea: "-5" },
    { lengthM: "0", widthM: "0" },
    { lengthM: "-1", widthM: "-1" },
    { totalFloorArea: "99999999" },
    { totalFloorArea: "0.0001" }
  ];
  edgeCases.forEach((overrides) => {
    const input = baseInput(Object.assign({ projectType: "room-renovation", finishLevel: "Standard" }, overrides));
    const quantity = Planner.computeQuantity(input, CFG.projectTypes["room-renovation"]);
    const budget = Planner.computeBudgetRange(input, CFG, quantity, Planner.computeComplexity(input));
    if (budget.computable) {
      assert.ok(Number.isFinite(budget.min), "min must be finite for " + JSON.stringify(overrides));
      assert.ok(Number.isFinite(budget.max), "max must be finite for " + JSON.stringify(overrides));
      assert.ok(budget.min >= 0, "min must not be negative for " + JSON.stringify(overrides));
      assert.ok(budget.max >= 0, "max must not be negative for " + JSON.stringify(overrides));
    }
  });
});

test("computeComplexity: accumulates score from structural/demolition/storeys/access/occupancy", () => {
  const low = Planner.computeComplexity(baseInput({ numberOfStoreys: "1", siteAccess: "easy", occupancy: "vacant" }));
  const high = Planner.computeComplexity(baseInput({
    structuralAlterations: true, demolition: true, numberOfStoreys: "3",
    siteAccess: "difficult", occupancy: "occupied", projectType: "new-build"
  }));
  assert.equal(low.level, "Low");
  assert.equal(high.level, "High");
  assert.ok(high.score > low.score);
});

test("getTradeChecklist: merges project-type defaults with explicitly selected trades, de-duplicated", () => {
  const input = baseInput({ projectType: "kitchen-renovation", plumbing: true, flooring: true });
  const checklist = Planner.getTradeChecklist(input, CFG);
  const keys = checklist.map((c) => c.key);
  assert.ok(keys.includes("plumbing"));
  assert.ok(keys.includes("electrical")); // default trade, not explicitly selected
  assert.ok(keys.includes("flooring"));
  assert.equal(keys.filter((k) => k === "plumbing").length, 1);
});

test("getMissingInfo: flags absent fields and clears once provided", () => {
  const empty = Planner.getMissingInfo(baseInput());
  assert.ok(empty.length > 0);

  const complete = Planner.getMissingInfo(baseInput({
    totalFloorArea: "20", projectType: "room-renovation", finishLevel: "Standard",
    siteAccess: "easy", occupancy: "vacant", suburb: "Claremont",
    preferredStartDate: "2026-08-01", customerName: "A Buyer", customerContact: "a@example.com"
  }));
  assert.equal(complete.length, 0);
});

test("buildSummary: generates a non-empty summary including project name and disclaimer", () => {
  const input = baseInput({ projectName: "Test Kitchen", projectType: "kitchen-renovation", totalFloorArea: "15", finishLevel: "Standard" });
  const result = Planner.runPlanner(input, CFG, { name: "Southern Suburbs Builders" });
  assert.ok(result.summary.includes("Test Kitchen"));
  assert.ok(result.summary.includes("preliminary"));
  assert.ok(result.summary.length > 0);
});

test("runPlanner: disabled budget mode still produces a full summary without numeric range", () => {
  const disabledCfg = Object.assign({}, CFG, { budgetEnabled: false });
  const input = baseInput({ projectName: "Test Wall", projectType: "boundary-wall", lengthM: "10" });
  const result = Planner.runPlanner(input, disabledCfg, { name: "Southern Suburbs Builders" });
  assert.equal(result.budget.enabled, false);
  assert.ok(result.summary.includes("disabled for this demo"));
  assert.ok(!/NaN|Infinity|undefined/.test(result.summary));
});

test("buildWhatsAppUrl: strips non-digits from phone number and URL-encodes the message", () => {
  const url = Planner.buildWhatsAppUrl("+27 (82) 555-0142", "Hi there! Budget: R1,000 & up?");
  assert.equal(url.indexOf("https://wa.me/27825550142?text="), 0);
  assert.ok(url.includes(encodeURIComponent("Hi there! Budget: R1,000 & up?")));
  assert.ok(!url.includes(" "));
  assert.ok(!url.includes("&up")); // raw "&" must not appear unescaped
});

test("buildWhatsAppUrl: omits the text param when no message is given", () => {
  const url = Planner.buildWhatsAppUrl("0825550142", "");
  assert.equal(url, "https://wa.me/0825550142");
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
  const second = Planner.resetInput();
  assert.equal(second.projectName, "");
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

test("getSiteInspectionRecommendation: recommended for high-value/complex projects", () => {
  const input = baseInput({ projectType: "new-build" });
  const complexity = Planner.computeComplexity(input);
  const rec = Planner.getSiteInspectionRecommendation(input, complexity, { computable: true });
  assert.equal(rec.recommended, true);
});

test("getSiteInspectionRecommendation: optional for a small, low-complexity project", () => {
  const input = baseInput({ projectType: "room-renovation", siteAccess: "easy", occupancy: "vacant", numberOfStoreys: "1" });
  const complexity = Planner.computeComplexity(input);
  const rec = Planner.getSiteInspectionRecommendation(input, complexity, { computable: true });
  assert.equal(rec.recommended, false);
});
