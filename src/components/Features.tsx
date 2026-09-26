import { FEATURES } from "../data/content";
import SectionHead from "./SectionHead";

export default function Features() {
  return (
    <section style={{ paddingTop: 0 }}>
      <SectionHead kicker="What's inside" title="Built for cat people, not spreadsheets" />
      <div className="features">
        {FEATURES.map((feature) => (
          <div className="feature" key={feature.title}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
