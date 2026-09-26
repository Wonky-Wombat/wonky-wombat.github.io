import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

// Vitest is only the test runner here; the app itself is built by Next.js.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
});
