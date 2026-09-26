// Inlined at build time. Empty string means "not configured" and the emotion demo stays hidden.
export const GATEWAY_URL: string = (process.env.NEXT_PUBLIC_GATEWAY_URL ?? "").replace(/\/+$/, "");
