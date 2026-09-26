import type { CSSProperties } from "react";
import { MOODS } from "../data/moods";
import SectionHead from "./SectionHead";

export default function MoodCards() {
  return (
    <section style={{ paddingTop: 0 }}>
      <SectionHead kicker="Five reads, one scan" title="The moods Catspace looks for." />
      <div className="moods">
        {MOODS.map((mood) => (
          <div className="mood-card" key={mood.label} style={{ "--dot": `var(${mood.colorVar})` } as CSSProperties}>
            <div className="dot" />
            <h3>{mood.label}</h3>
            <p>{mood.cues}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
