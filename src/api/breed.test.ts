import { describe, expect, it, vi } from "vitest";
import { BreedApiError, identifyBreed } from "./breed";

const file = new File([new Uint8Array([0xff, 0xd8, 0xff])], "cat.jpg", { type: "image/jpeg" });
const baseUrl = "https://gateway.test";

function fetchReturning(response: Response) {
  return vi.fn<typeof fetch>(async () => response);
}

async function errorOf(promise: Promise<unknown>): Promise<BreedApiError> {
  try {
    await promise;
  } catch (error) {
    if (error instanceof BreedApiError) return error;
    throw error;
  }
  throw new Error("expected the call to fail");
}

describe("identifyBreed", () => {
  it("posts the file as multipart form data to the gateway", async () => {
    const fetchImpl = fetchReturning(Response.json({ hasCat: false }));

    await identifyBreed(file, { baseUrl, fetchImpl });

    const [url, init] = fetchImpl.mock.calls[0]!;
    expect(url).toBe("https://gateway.test/api/breed");
    expect(init?.method).toBe("POST");
    expect((init?.body as FormData).get("file")).toBeInstanceOf(File);
  });

  it("returns the predicted breed, fur pattern, and probabilities", async () => {
    const fetchImpl = fetchReturning(
      Response.json({
        hasCat: true,
        detectCls: "cat",
        predictedLabel: "Maine Coon",
        topProbabilities: [
          { label: "Maine Coon", probability: 0.82 },
          { label: "Norwegian Forest", probability: 0.11 },
        ],
        predictedFurPattern: "tabby",
      }),
    );

    const result = await identifyBreed(file, { baseUrl, fetchImpl });

    expect(result).toEqual({
      kind: "cat",
      breed: "Maine Coon",
      furPattern: "tabby",
      probabilities: [
        { label: "Maine Coon", probability: 0.82 },
        { label: "Norwegian Forest", probability: 0.11 },
      ],
    });
  });

  it("treats a missing fur pattern and probabilities as absent, not an error", async () => {
    const fetchImpl = fetchReturning(Response.json({ hasCat: true, predictedLabel: "Domestic Shorthair" }));

    const result = await identifyBreed(file, { baseUrl, fetchImpl });

    expect(result).toEqual({ kind: "cat", breed: "Domestic Shorthair", furPattern: null, probabilities: [] });
  });

  it("reports when no cat was detected", async () => {
    const result = await identifyBreed(file, { baseUrl, fetchImpl: fetchReturning(Response.json({ hasCat: false })) });
    expect(result).toEqual({ kind: "no_cat" });
  });

  it("treats a cat result without a predicted label as an invalid response", async () => {
    const fetchImpl = fetchReturning(Response.json({ hasCat: true }));
    expect((await errorOf(identifyBreed(file, { baseUrl, fetchImpl }))).code).toBe("invalid_response");
  });

  it.each([
    [413, "too_large"],
    [415, "unsupported_type"],
    [502, "unavailable"],
    [503, "unavailable"],
  ])("maps HTTP %i to %s", async (status, code) => {
    const error = await errorOf(identifyBreed(file, { baseUrl, fetchImpl: fetchReturning(new Response("{}", { status })) }));
    expect(error.code).toBe(code);
  });

  it("exposes Retry-After on rate limiting", async () => {
    const response = new Response("{}", { status: 429, headers: { "Retry-After": "42" } });
    const error = await errorOf(identifyBreed(file, { baseUrl, fetchImpl: fetchReturning(response) }));
    expect(error).toMatchObject({ code: "rate_limited", retryAfterSeconds: 42 });
  });

  it("maps network failures", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => {
      throw new TypeError("Failed to fetch");
    });
    expect((await errorOf(identifyBreed(file, { baseUrl, fetchImpl }))).code).toBe("network");
  });

  it("rejects responses that do not match the schema", async () => {
    const bad = Response.json({ hasCat: "yes" });
    expect((await errorOf(identifyBreed(file, { baseUrl, fetchImpl: fetchReturning(bad) }))).code).toBe("invalid_response");
  });

  it("lets aborts propagate instead of reporting a network error", async () => {
    const fetchImpl = vi.fn<typeof fetch>(async () => {
      throw new DOMException("Aborted", "AbortError");
    });
    await expect(identifyBreed(file, { baseUrl, fetchImpl })).rejects.toMatchObject({ name: "AbortError" });
  });
});
