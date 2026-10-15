#!/usr/bin/env node
import { runJavascriptNodeOperation } from "@red-cup-engineering/javascript-node-operation-engineering-services-section/operation";
// NREL PVWatts Calculator (https://pvwatts.nrel.gov/pvwatts.php) documents a default
// system-loss-derived performance ratio in the 0.75-0.85 range; 0.80 is the declared
// mid-range default used when a caller does not state its own ratio.
const DEFAULT_PERFORMANCE_RATIO = "0.80";

function observationsForPlace(observations, place) {
  return observations.filter((observation) => observation.place.lat === place.lat && observation.place.lon === place.lon);
}

/**
 * Projects a system's kilowatt-hour yield over a period from a place's already-observed
 * irradiance, labeled a projection with its dataset named.
 * @param {object} request A record with place ({lat, lon}), irradianceObservations
 *   (IrradianceObservation[]), systemSizeKw, periodDays, and optional performanceRatio.
 * @returns {object} A YieldProjection record, or a no-observation-for-place refusal datum.
 * @throws {TypeError} When place, irradianceObservations, systemSizeKw, or periodDays is
 *   malformed.
 */
export function deriveYieldProjection(request) {
  if (typeof request?.place?.lat !== "number" || typeof request?.place?.lon !== "number") {
    throw new TypeError("place.lat and place.lon are required numbers");
  }
  if (!Array.isArray(request?.irradianceObservations)) {
    throw new TypeError("irradianceObservations must be an array");
  }
  if (typeof request?.systemSizeKw !== "string" || request.systemSizeKw.length === 0) {
    throw new TypeError("systemSizeKw is required");
  }
  if (!Number.isInteger(request?.periodDays)) {
    throw new TypeError("periodDays must be an integer");
  }
  const matched = observationsForPlace(request.irradianceObservations, request.place);
  if (matched.length === 0) {
    return { refused: true, reason: "no-observation-for-place" };
  }
  const performanceRatio = typeof request.performanceRatio === "string" ? request.performanceRatio : DEFAULT_PERFORMANCE_RATIO;
  const totalGhi = matched.reduce((sum, observation) => sum + Number(observation.dailyGhiKwhPerM2), 0);
  const projectedKwh = totalGhi * Number(request.systemSizeKw) * Number(performanceRatio);
  const latest = matched.reduce((a, b) => (a.asOf > b.asOf ? a : b));
  return {
    type: "YieldProjection",
    version: 1,
    label: "projection",
    projectedKwh: projectedKwh.toFixed(4),
    datasetName: latest.datasetName,
    datasetUrl: latest.datasetUrl,
    methodology: latest.methodology,
    asOf: latest.asOf,
  };
}

if (import.meta.main) {
  const result = await runJavascriptNodeOperation({ name: "derive-yield-projection", description: "Projects a system's kilowatt-hour yield over a period from a place's already-observed irradiance, labeled a projection with its dataset named.", operation: deriveYieldProjection }, { arguments: process.argv.slice(2), standardInput: process.stdin, standardOutput: process.stdout });
  process.exitCode = result.exitCode;
}
