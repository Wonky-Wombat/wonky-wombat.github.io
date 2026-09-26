import { PLANS } from "../data/content";
import SectionHead from "./SectionHead";

export default function Pricing() {
  return (
    <section style={{ paddingTop: 0 }}>
      <SectionHead kicker="Pricing" title="Free to start, upgrade if you're hooked." />
      <div className="pricing">
        {PLANS.map((plan) => (
          <div className={plan.highlighted ? "plan pro" : "plan"} key={plan.tag}>
            <span className="tag">{plan.tag}</span>
            <div className="price">
              {plan.price} {plan.priceSuffix && <small>{plan.priceSuffix}</small>}
            </div>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
