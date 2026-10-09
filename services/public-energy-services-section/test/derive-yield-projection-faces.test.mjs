import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { deriveYieldProjection } from "../scripts/derive-yield-projection.mjs";

const examples = [
  {
    "type": "JavascriptNodeOperationExample",
    "name": "projects yield with the default performance ratio",
    "input": {
      "place": {
        "lat": 43.02,
        "lon": -102.55
      },
      "irradianceObservations": [
        {
          "place": {
            "lat": 43.02,
            "lon": -102.55
          },
          "dailyGhiKwhPerM2": "3.0",
          "date": "2026-01-01",
          "datasetName": "NASA POWER",
          "datasetUrl": "https://power.larc.nasa.gov/api/temporal/daily/point",
          "methodology": "satellite-reanalysis",
          "asOf": "2026-09-05"
        }
      ],
      "systemSizeKw": "5",
      "periodDays": 1
    },
    "output": {
      "type": "YieldProjection",
      "version": 1,
      "label": "projection",
      "projectedKwh": "12.0000",
      "datasetName": "NASA POWER",
      "datasetUrl": "https://power.larc.nasa.gov/api/temporal/daily/point",
      "methodology": "satellite-reanalysis",
      "asOf": "2026-09-05"
    }
  },
  {
    "type": "JavascriptNodeOperationExample",
    "name": "refuses as data on empty observations",
    "input": {
      "place": {
        "lat": 43.02,
        "lon": -102.55
      },
      "irradianceObservations": [],
      "systemSizeKw": "5",
      "periodDays": 1
    },
    "output": {
      "refused": true,
      "reason": "no-observation-for-place"
    }
  }
];

for (const example of examples) {
  test(example.name, async () => {
    const importedOutput = await deriveYieldProjection(example.input);
    assert.deepEqual(importedOutput, example.output);
    const command = spawnSync(process.execPath, [fileURLToPath(new URL("../scripts/derive-yield-projection.mjs", import.meta.url))], {
      input: JSON.stringify(example.input) + "\n",
      encoding: "utf8",
    });
    assert.equal(command.status, 0, command.stderr);
    const commandOutput = JSON.parse(command.stdout.trim());
    assert.deepEqual(commandOutput, example.output);
    assert.deepEqual(commandOutput, importedOutput);
  });
}
