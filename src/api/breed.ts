import { z } from "zod";

// Mirrors BreedResponseSchema's output in Catspace-Algorithm/services/cat-web-gateway.
const GatewayResponseSchema = z.object({
  hasCat: z.boolean(),
  detectCls: z.string().nullish(),
  predictedLabel: z.string().nullish(),
  topProbabilities: z.array(z.object({ label: z.string(), probability: z.number() })).nullish(),
  predictedFurPattern: z.string().nullish(),
});

export interface BreedProbability {
  label: string;
  probability: number;
}

export type BreedResult =
  | { kind: "no_cat" }
  | { kind: "cat"; breed: string; furPattern: string | null; probabilities: BreedProbability[] };

export type BreedErrorCode =
  | "rate_limited"
  | "too_large"
  | "unsupported_type"
  | "unavailable"
  | "network"
  | "invalid_response";

export class BreedApiError extends Error {
  constructor(
    readonly code: BreedErrorCode,
    message: string,
    /** Seconds until the request may be retried, when the gateway tells us. */
    readonly retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "BreedApiError";
  }
}

export interface IdentifyOptions {
  baseUrl: string;
  signal?: AbortSignal;
  fetchImpl?: typeof fetch;
}

export async function identifyBreed(
  file: File,
  { baseUrl, signal, fetchImpl = fetch }: IdentifyOptions,
): Promise<BreedResult> {
  const form = new FormData();
  form.append("file", file);

  let response: Response;
  try {
    response = await fetchImpl(`${baseUrl}/api/breed`, { method: "POST", body: form, signal });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") throw error;
    throw new BreedApiError("network", "Could not reach the Catspace server.");
  }

  if (!response.ok) throw errorForStatus(response);

  const parsed = GatewayResponseSchema.safeParse(await response.json().catch(() => null));
  if (!parsed.success) {
    throw new BreedApiError("invalid_response", "The server sent an unexpected response.");
  }

  const { hasCat, predictedLabel, topProbabilities, predictedFurPattern } = parsed.data;
  if (!hasCat) return { kind: "no_cat" };

  if (!predictedLabel) {
    throw new BreedApiError("invalid_response", "The server sent an unexpected response.");
  }

  return {
    kind: "cat",
    breed: predictedLabel,
    furPattern: predictedFurPattern ?? null,
    probabilities: topProbabilities ?? [],
  };
}

function errorForStatus(response: Response): BreedApiError {
  switch (response.status) {
    case 413:
      return new BreedApiError("too_large", "That image is too large.");
    case 415:
      return new BreedApiError("unsupported_type", "Only JPG and PNG images are supported.");
    case 429: {
      const retryAfter = Number(response.headers.get("Retry-After"));
      return new BreedApiError(
        "rate_limited",
        "Too many scans in a short time.",
        Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : undefined,
      );
    }
    default:
      return new BreedApiError("unavailable", "Breed detection is temporarily unavailable.");
  }
}
