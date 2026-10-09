#!/usr/bin/env node
import { runJavascriptNodeOperation } from "@red-cup-engineering/javascript-node-services-section/operation";
// Documented, optional conversion step: registry.561.group has no pure-JS
// SVG rasterizer (resvg-js / @resvg/resvg-js both 404 there). `sharp` is
// available but is a native libvips binding, not pure JS, so it is not a
// package dependency here -- install it yourself first:
//   npm install --no-save sharp
// Usage: node scripts/convert-svg-to-png.mjs <in.svg> <out.png> [width]

export async function convertSvgToPng(inputPath, outputPath, width = 3600) {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    throw new Error(
      "sharp is not installed. Run `npm install --no-save sharp` in this package, then retry. " +
        "sharp is a native binding (not pure JS), which is why it is not a default dependency of this factory."
    );
  }
  await sharp(inputPath, { density: 300 }).resize({ width }).png().toFile(outputPath);
  return outputPath;
}

if (import.meta.main) {
  const result = await runJavascriptNodeOperation({ name: "convert-svg-to-png", description: "convertSvgToPng — the convert-svg-to-png operation.", operation: convertSvgToPng }, { arguments: process.argv.slice(2), standardInput: process.stdin, standardOutput: process.stdout });
  process.exitCode = result.exitCode;
}
