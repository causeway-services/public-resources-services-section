#!/usr/bin/env node
// Verb script: render one design spec to a print-ready SVG file.
// Imports src (design-factory) only, per import stratification law.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { renderDesign } from "../src/design-factory.mjs";
import { designById } from "../src/corpus.mjs";
import { runJavascriptNodeOperation } from "@red-cup-engineering/javascript-node-services-section/operation";

export async function generateDesign(spec, outDir) {
  if (typeof spec === "string") {
    const found = designById(spec);
    if (!found) throw new Error(`no design with id "${spec}" in the corpus`);
    spec = found;
  }
  const svg = renderDesign(spec);
  await mkdir(outDir, { recursive: true });
  const filePath = path.join(outDir, `${spec.id}.svg`);
  await writeFile(filePath, svg, "utf8");
  return { spec, filePath, svg };
}

if (import.meta.main) {
  const result = await runJavascriptNodeOperation({ name: "generate-design", description: "generateDesign — the generate-design operation.", operation: generateDesign }, { arguments: process.argv.slice(2), standardInput: process.stdin, standardOutput: process.stdout });
  process.exitCode = result.exitCode;
}
