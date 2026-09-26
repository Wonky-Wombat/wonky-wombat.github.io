import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProbabilityBars from "./ProbabilityBars";

describe("ProbabilityBars", () => {
  it("renders one accessible meter per breed in the given order", () => {
    render(
      <ProbabilityBars
        probabilities={[
          { label: "Maine Coon", probability: 0.82 },
          { label: "Norwegian Forest", probability: 0.11 },
        ]}
      />,
    );

    const meters = screen.getAllByRole("meter");
    expect(meters.map((meter) => meter.getAttribute("aria-label"))).toEqual(["Maine Coon", "Norwegian Forest"]);
    expect(screen.getByRole("meter", { name: "Maine Coon" })).toHaveAttribute("aria-valuenow", "82");
    expect(screen.getByRole("meter", { name: "Maine Coon" })).toHaveAttribute("aria-valuemax", "100");
  });

  it("sizes each bar proportionally to its probability", () => {
    const { container } = render(<ProbabilityBars probabilities={[{ label: "Siamese", probability: 0.6 }]} />);
    expect(container.querySelector<HTMLElement>(".prob-bar-fill")?.style.width).toBe("60%");
  });

  it("shows the rounded percentage for people who cannot rely on bar length", () => {
    render(<ProbabilityBars probabilities={[{ label: "Persian", probability: 0.437 }]} />);
    expect(screen.getByText("44%")).toBeInTheDocument();
  });
});
