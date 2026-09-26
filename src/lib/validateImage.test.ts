import { describe, expect, it } from "vitest";
import { MAX_IMAGE_BYTES, validateImage } from "./validateImage";

const make = (bytes: number, type: string) => new File([new Uint8Array(bytes)], "cat", { type });

describe("validateImage", () => {
  it("accepts JPEG and PNG within the size limit", () => {
    expect(validateImage(make(1024, "image/jpeg"))).toBeNull();
    expect(validateImage(make(1024, "image/png"))).toBeNull();
    expect(validateImage(make(MAX_IMAGE_BYTES, "image/png"))).toBeNull();
  });

  it("rejects empty files", () => {
    expect(validateImage(make(0, "image/jpeg"))).toBe("empty");
  });

  it("rejects other formats such as HEIC, GIF and PDF", () => {
    expect(validateImage(make(10, "image/heic"))).toBe("unsupported_type");
    expect(validateImage(make(10, "image/gif"))).toBe("unsupported_type");
    expect(validateImage(make(10, "application/pdf"))).toBe("unsupported_type");
  });

  it("rejects files over the size limit", () => {
    expect(validateImage(make(MAX_IMAGE_BYTES + 1, "image/jpeg"))).toBe("too_large");
  });
});
