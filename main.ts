import { mkdirSync, writeFileSync } from "node:fs";

// One fortune cookie line for a trader who just got liquidated.
// Fortune-cookie voice up front ("Your lucky numbers are..."), then the
// punchline breaks the pattern: the third "lucky number" is not a number
// at all, it is the price he should have sold at.
const fortune =
  "Your lucky numbers are 3, 7, and the price you should have sold at.";

// The gate: 1 to 160 characters, at most 20 words. Refuse to write a
// line that would fail it instead of shipping a bad entry.
const words = fortune.split(/\s+/).filter(Boolean).length;
if (fortune.length < 1 || fortune.length > 160 || words > 20) {
  throw new Error(
    `fortune fails the gate: ${fortune.length} chars, ${words} words`,
  );
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", fortune, "utf8");
