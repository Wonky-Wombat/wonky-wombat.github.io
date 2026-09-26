import { STEPS } from "../data/content";
import SectionHead from "./SectionHead";

export default function HowItWorks() {
  return (
    <section>
      <SectionHead kicker="How it works" title="From photo to mood in three taps" />
      <div className="steps">
        {STEPS.map((step, index) => (
          <div className="step" key={step.title}>
            <div className="step-num">{index + 1}</div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
