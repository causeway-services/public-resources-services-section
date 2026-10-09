import assert from "node:assert/strict";
import test from "node:test";
import { deriveYieldProjection } from "../scripts/derive-yield-projection.mjs";

const place = { lat: 43.02, lon: -102.55 };
const observations = [
  { place, dailyGhiKwhPerM2: "3.0", date: "2026-01-01", datasetName: "NASA POWER", datasetUrl: "https://power.larc.nasa.gov/api/temporal/daily/point", methodology: "satellite-reanalysis", asOf: "2026-09-05" },
  { place, dailyGhiKwhPerM2: "2.5", date: "2026-01-02", datasetName: "NASA POWER", datasetUrl: "https://power.larc.nasa.gov/api/temporal/daily/point", methodology: "satellite-reanalysis", asOf: "2026-09-05" },
];

test("projects yield from matching observations with the default performance ratio", () => {
  const result = deriveYieldProjection({ place, irradianceObservations: observations, systemSizeKw: "5", periodDays: 2 });
  assert.equal(result.type, "YieldProjection");
  assert.equal(result.label, "projection");
  assert.equal(result.projectedKwh, (5.5 * 5 * 0.8).toFixed(4));
  assert.equal(result.datasetName, "NASA POWER");
});

test("an explicit performanceRatio overrides the default", () => {
  const result = deriveYieldProjection({ place, irradianceObservations: observations, systemSizeKw: "5", periodDays: 2, performanceRatio: "0.9" });
  assert.equal(result.projectedKwh, (5.5 * 5 * 0.9).toFixed(4));
});

test("refuses as data on empty observations", () => {
  const result = deriveYieldProjection({ place, irradianceObservations: [], systemSizeKw: "5", periodDays: 2 });
  assert.deepEqual(result, { refused: true, reason: "no-observation-for-place" });
});

test("refuses as data when no observation matches the requested place", () => {
  const result = deriveYieldProjection({
    place: { lat: 1, lon: 1 },
    irradianceObservations: observations,
    systemSizeKw: "5",
    periodDays: 2,
  });
  assert.deepEqual(result, { refused: true, reason: "no-observation-for-place" });
});

test("refuses a missing systemSizeKw", () => {
  assert.throws(() => deriveYieldProjection({ place, irradianceObservations: observations, periodDays: 2 }), /systemSizeKw is required/u);
});
