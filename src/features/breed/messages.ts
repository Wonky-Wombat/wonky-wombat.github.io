import { MAX_IMAGE_BYTES } from "../../lib/validateImage";
import type { ScanError } from "./useBreedScan";

const MAX_MB = MAX_IMAGE_BYTES / (1024 * 1024);

export function describeScanError(error: ScanError): string {
  switch (error.code) {
    case "empty":
      return "That file looks empty. Try another photo.";
    case "unsupported_type":
      return "Only JPG and PNG photos are supported.";
    case "too_large":
      return `That photo is too large. Please use one under ${MAX_MB} MB.`;
    case "rate_limited":
      return error.retryAfterSeconds
        ? `You've scanned a lot in a short time. Please try again in ${error.retryAfterSeconds} seconds.`
        : "You've scanned a lot in a short time. Please wait a minute and try again.";
    case "network":
      return "Couldn't reach Catspace. Check your connection and try again.";
    case "unavailable":
    case "invalid_response":
    case "unknown":
      return "Something went wrong while reading that photo. Please try again in a moment.";
  }
}
