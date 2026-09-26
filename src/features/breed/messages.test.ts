import { describe, expect, it } from "vitest";
import { describeScanError } from "./messages";

describe("describeScanError", () => {
  it("mentions the size limit for oversized photos", () => {
    expect(describeScanError({ code: "too_large" })).toContain("20 MB");
  });

  it("tells the user how long to wait when the gateway says so", () => {
    expect(describeScanError({ code: "rate_limited", retryAfterSeconds: 30 })).toContain("30 seconds");
  });

  it("falls back to a generic wait message without Retry-After", () => {
    expect(describeScanError({ code: "rate_limited" })).toContain("wait a minute");
  });

  it("never leaks technical details for server-side failures", () => {
    for (const code of ["unavailable", "invalid_response", "unknown"] as const) {
      expect(describeScanError({ code })).toBe("Something went wrong while reading that photo. Please try again in a moment.");
    }
  });
});
