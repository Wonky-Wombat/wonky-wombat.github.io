import type { BreedProbability } from "../../api/breed";

export default function ProbabilityBars({ probabilities }: { probabilities: readonly BreedProbability[] }) {
  return (
    <ul className="prob-bars">
      {probabilities.map(({ label, probability }) => {
        const pct = Math.round(probability * 100);
        return (
          <li key={label} className="prob-bar">
            <span className="prob-bar-label">{label}</span>
            <span className="prob-bar-pct">{pct}%</span>
            <div
              className="prob-bar-track"
              role="meter"
              aria-label={label}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pct}
            >
              <div className="prob-bar-fill" style={{ width: `${pct}%` }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
