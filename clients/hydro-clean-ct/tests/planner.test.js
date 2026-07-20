/**
 * Tests for the Surface Cleaning Estimate Planner calculation engine.
 * Run with: node tests/planner.test.js
 * Zero dependencies — uses Node's built-in assert module only.
 */
var assert = require("assert");
var calc = require("../planner.js").calc;

var results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name: name, pass: true });
  } catch (err) {
    results.push({ name: name, pass: false, error: err.message });
  }
}

/* ---------------- Unit conversion ---------------- */
test("toMeters converts cm/ft/in correctly", function () {
  assert.strictEqual(calc.toMeters(100, "cm"), 1);
  assert.strictEqual(Math.round(calc.toMeters(1, "ft") * 10000) / 10000, 0.3048);
  assert.strictEqual(Math.round(calc.toMeters(1, "in") * 10000) / 10000, 0.0254);
  assert.strictEqual(calc.toMeters(2.5, "m"), 2.5);
});

test("toMeters rejects non-positive or unknown units", function () {
  assert.strictEqual(calc.toMeters(0, "m"), null);
  assert.strictEqual(calc.toMeters(-5, "m"), null);
  assert.strictEqual(calc.toMeters(5, "yards"), null);
});

/* ---------------- Single area / decimals ---------------- */
test("calcEntryArea computes a simple rectangle in metres", function () {
  var r = calc.calcEntryArea({ length: 4, width: 3, count: 1, unit: "m" });
  assert.strictEqual(r.area, 12);
  assert.deepStrictEqual(r.errors, []);
});

test("calcEntryArea handles decimal measurements", function () {
  var r = calc.calcEntryArea({ length: 3.25, width: 2.5, count: 1, unit: "m" });
  assert.strictEqual(Math.round(r.area * 100) / 100, 8.13);
});

test("calcEntryArea converts cm inputs before multiplying", function () {
  var r = calc.calcEntryArea({ length: 400, width: 300, count: 1, unit: "cm" });
  assert.strictEqual(r.area, 12);
});

/* ---------------- Multiple areas / repeated surfaces ---------------- */
test("sumAreas totals multiple valid entries", function () {
  var r = calc.sumAreas([
    { length: 4, width: 3, count: 1, unit: "m" },
    { length: 2, width: 2, count: 1, unit: "m" }
  ]);
  assert.strictEqual(r.total, 16);
  assert.strictEqual(r.hasErrors, false);
});

test("sumAreas respects the identical-area count multiplier (e.g. repeated wall sections)", function () {
  var r = calc.sumAreas([{ length: 5, width: 2.4, count: 4, unit: "m" }]); // 4 identical wall sections
  assert.strictEqual(r.total, 48);
});

test("sumAreas flags per-entry errors without throwing", function () {
  var r = calc.sumAreas([
    { length: 4, width: 3, count: 1, unit: "m" },
    { length: -1, width: 3, count: 1, unit: "m" }
  ]);
  assert.strictEqual(r.hasErrors, true);
  assert.strictEqual(r.total, 12); // only the valid entry counted
});

/* ---------------- Missing / invalid input ---------------- */
test("calcEntryArea reports a required-field error when length is missing", function () {
  var r = calc.calcEntryArea({ length: "", width: 3, count: 1, unit: "m" });
  assert.strictEqual(r.area, null);
  assert.ok(r.errors.length > 0);
});

test("calcEntryArea rejects non-numeric input", function () {
  var r = calc.calcEntryArea({ length: "abc", width: 3, count: 1, unit: "m" });
  assert.strictEqual(r.area, null);
});

/* ---------------- Zero / negative values ---------------- */
test("calcEntryArea rejects zero and negative dimensions", function () {
  assert.strictEqual(calc.calcEntryArea({ length: 0, width: 3, count: 1, unit: "m" }).area, null);
  assert.strictEqual(calc.calcEntryArea({ length: 4, width: -3, count: 1, unit: "m" }).area, null);
});

test("applyAdjustment never returns a negative or NaN result", function () {
  assert.strictEqual(calc.applyAdjustment(-10, 10), 0);
  assert.strictEqual(calc.applyAdjustment(NaN, 10), 0);
  assert.ok(calc.applyAdjustment(10, -50) >= 0);
});

test("applyAdjustment applies a percentage correctly", function () {
  assert.strictEqual(calc.applyAdjustment(10, 10), 11);
  assert.strictEqual(calc.applyAdjustment(20, 15), 23);
});

/* ---------------- Option lookup ---------------- */
test("findOption returns the matching entry by id", function () {
  var list = [{ id: "a", timeMultiplier: 5 }, { id: "b", timeMultiplier: 10 }];
  assert.strictEqual(calc.findOption(list, "b").timeMultiplier, 10);
});

test("findOption returns null for an unknown id or missing list", function () {
  assert.strictEqual(calc.findOption([{ id: "a" }], "z"), null);
  assert.strictEqual(calc.findOption(null, "a"), null);
});

/* ---------------- Complexity adjustment ---------------- */
var LEVELS_CFG = {
  conditionLevels: [
    { id: "light", timeMultiplier: 0 },
    { id: "heavy", timeMultiplier: 25 }
  ],
  accessLevels: [
    { id: "ground", timeMultiplier: 0 },
    { id: "restricted", timeMultiplier: 15 }
  ]
};

test("calcComplexityPercent sums condition and access multipliers", function () {
  assert.strictEqual(calc.calcComplexityPercent("heavy", "restricted", LEVELS_CFG), 40);
});

test("calcComplexityPercent treats unselected/unknown levels as 0", function () {
  assert.strictEqual(calc.calcComplexityPercent("", "", LEVELS_CFG), 0);
  assert.strictEqual(calc.calcComplexityPercent("unknown", "ground", LEVELS_CFG), 0);
});

/* ---------------- Time estimate ---------------- */
test("calcTimeEstimateHours divides area by coverage rate and rounds up to nearest half hour", function () {
  assert.strictEqual(calc.calcTimeEstimateHours(38, 40), 1); // 0.95 -> 1
  assert.strictEqual(calc.calcTimeEstimateHours(41, 40), 1.5); // 1.025 -> 1.5
});

test("calcTimeEstimateHours enforces a 0.5 hour minimum for small areas", function () {
  assert.strictEqual(calc.calcTimeEstimateHours(1, 40), 0.5);
});

test("calcTimeEstimateHours returns null (unknown, not zero) when no coverage rate is configured", function () {
  assert.strictEqual(calc.calcTimeEstimateHours(38, null), null);
});

test("calcTimeEstimateHours returns 0 for zero/negative area", function () {
  assert.strictEqual(calc.calcTimeEstimateHours(0, 40), 0);
  assert.strictEqual(calc.calcTimeEstimateHours(-5, 40), 0);
});

/* ---------------- Cost estimate ---------------- */
test("calcCostEstimate prefers hourly pricing over per-m2 pricing", function () {
  assert.strictEqual(calc.calcCostEstimate(2, 50, 40, 5), 80); // 2hr * $40/hr
});

test("calcCostEstimate falls back to per-m2 pricing when hourly rate or time is absent", function () {
  assert.strictEqual(calc.calcCostEstimate(null, 50, "", 5), 250); // 50m2 * $5/m2
});

test("calcCostEstimate returns null when no pricing supplied", function () {
  assert.strictEqual(calc.calcCostEstimate(2, 50, "", ""), null);
});

/* ---------------- Full pipeline / summary ---------------- */
var CFG = {
  currencySymbol: "$",
  surfaceTypes: [{ id: "concrete-paving", label: "Concrete / Paving", coverageRatePerHourM2: 40 }],
  conditionLevels: [{ id: "moderate", label: "Moderate", timeMultiplier: 10 }],
  accessLevels: [{ id: "ground", label: "Ground level", timeMultiplier: 0 }]
};

test("computeResults runs end-to-end without NaN/Infinity/negative outputs", function () {
  var state = {
    projectType: "Driveway or paving",
    areas: [{ length: 4, width: 3, count: 1, unit: "m" }],
    surfaceType: "concrete-paving",
    conditionLevel: "moderate",
    accessLevel: "ground",
    pricePerHour: 40,
    conditions: {}
  };
  var res = calc.computeResults(state, CFG);
  [res.totalAreaM2, res.adjustedAreaM2, res.estimatedHours, res.costEstimate].forEach(function (v) {
    assert.ok(v === null || (isFinite(v) && v >= 0), "value should be finite and non-negative or null: " + v);
  });
  assert.ok(res.adjustedAreaM2 >= res.totalAreaM2);
});

test("computeResults never throws on a completely empty state", function () {
  var state = { areas: [{ length: "", width: "", count: "" }], conditions: {} };
  var res = calc.computeResults(state, {});
  assert.strictEqual(res.totalAreaM2, 0);
  assert.ok(Array.isArray(res.missing) && res.missing.length > 0);
});

test("buildSummaryText produces a non-empty, human-readable string with no [object Object]", function () {
  var state = {
    projectType: "Driveway or paving", areaMode: "single", unit: "m",
    areas: [{ label: "Driveway", length: 4, width: 3, count: 1 }],
    surfaceType: "concrete-paving", conditionLevel: "moderate", accessLevel: "ground",
    conditions: { heavyMoldAlgae: true },
    contact: { name: "Test User", phone: "555-0100", suburb: "Your Service Area", method: "whatsapp" }
  };
  var res = calc.computeResults(state, CFG);
  var text = calc.buildSummaryText(state, res, CFG);
  assert.ok(typeof text === "string" && text.length > 50);
  assert.ok(text.indexOf("[object Object]") === -1);
  assert.ok(text.indexOf("Driveway or paving") !== -1);
  assert.ok(text.indexOf("preliminary planning estimate") !== -1);
});

/* ---------------- Report ---------------- */
var failed = results.filter(function (r) { return !r.pass; });
results.forEach(function (r) {
  console.log((r.pass ? "PASS" : "FAIL") + " - " + r.name + (r.error ? " :: " + r.error : ""));
});
console.log("\n" + (results.length - failed.length) + "/" + results.length + " tests passed.");
if (failed.length > 0) process.exit(1);
