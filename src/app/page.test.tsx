import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

async function renderApp() {
  const { default: App } = await import("./page");
  render(<App />);
}

describe("Home page", () => {
  it("renders the landing page and points visitors to the app for mood scanning, without the breed demo, when no gateway is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GATEWAY_URL", "");
    await renderApp();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Know what your cat is really feeling.");
    expect(screen.getByText("Want to know what they're really feeling?")).toBeInTheDocument();
    expect(screen.queryByText("Choose a photo of your cat")).not.toBeInTheDocument();
  });

  it("shows the breed demo when a gateway is configured", async () => {
    vi.stubEnv("NEXT_PUBLIC_GATEWAY_URL", "https://gateway.test/");
    await renderApp();

    expect(screen.getByText("What breed is your cat, really?")).toBeInTheDocument();
    expect(screen.getByText("Choose a photo of your cat")).toBeInTheDocument();
  });
});
