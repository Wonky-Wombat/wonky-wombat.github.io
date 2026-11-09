import { PLANS } from "../data/content";
import { APP_STORE_URL } from "../data/site";
import SectionHead from "./SectionHead";

export default function Pricing() {
  return (
    <section>
      <SectionHead
        title={
          <>
            Free To Start, <em>Pro If You Want More</em>
          </>
        }
      />
      <div className="pricing">
        {PLANS.map((plan) => (
          <div className={plan.highlighted ? "plan pro" : "plan"} key={plan.tag}>
            <span className="tag">{plan.tag}</span>
            <div className="price">
              {plan.price} {plan.priceSuffix && <small>{plan.priceSuffix}</small>}
            </div>
            <div className="plan-note">{plan.note ?? " "}</div>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
            {plan.cta && (
              <a className="plan-cta" href={APP_STORE_URL} target="_blank" rel="noopener">
                {plan.cta}
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
