import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { MOODS } from "./moods";

const css = readFileSync("src/styles/global.css", "utf8");

describe("MOODS", () => {
  it("covers the five moods the app reports", () => {
    expect(MOODS.map((mood) => mood.label)).toEqual(["Relaxed", "Happy", "Curious", "Fearful", "Aggressive"]);
  });

  it.each(MOODS)("$label has a color variable defined in global.css", ({ colorVar }) => {
    expect(css).toContain(`${colorVar}:`);
  });
});
