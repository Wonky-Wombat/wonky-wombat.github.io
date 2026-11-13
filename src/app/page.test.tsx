import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./page";

describe("Home page", () => {
  it("presents Catspace as a mood diary", () => {
    render(<App />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("A Mood Diary For Your Cat");
    expect(screen.getByText("New in 3.0.0")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Log Mood screen/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Catspace app preview video")).toHaveAttribute("src", "/video/catspace-preview.mp4");
    expect(screen.getByRole("link", { name: "Get Catspace Pro" })).toHaveAttribute(
      "href",
      "https://apps.apple.com/app/id6748916843",
    );
  });

  it("no longer offers the breed demo", () => {
    render(<App />);

    expect(screen.queryByText("Choose a photo of your cat")).not.toBeInTheDocument();
  });
});
