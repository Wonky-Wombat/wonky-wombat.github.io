// Keep in sync with MAX_UPLOAD_BYTES on the gateway (docker-compose.yml). This
// check only saves the user a round trip; the gateway re-validates by
// inspecting the file itself.
export const MAX_IMAGE_BYTES = 20 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export const ACCEPT_ATTRIBUTE = ACCEPTED_TYPES.join(",");

export type ImageProblem = "empty" | "unsupported_type" | "too_large";

export function validateImage(file: File): ImageProblem | null {
  if (file.size === 0) return "empty";
  if (!ACCEPTED_TYPES.includes(file.type)) return "unsupported_type";
  if (file.size > MAX_IMAGE_BYTES) return "too_large";
  return null;
}
