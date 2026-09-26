import { LOGO_SRC } from "../data/site";
import StoreButton from "./StoreButton";

export default function Hero() {
  return (
    <section className="hero" style={{ paddingBlock: 0 }}>
      <div className="paws" />
      <div className="hero-inner" style={{ paddingBlock: "48px 40px" }}>
        <div>
          <span className="eyebrow">AI Cat Mood Scanner</span>
          <h1>
            Know what your cat is <em>really</em> feeling
          </h1>
          <p className="hero-sub">
            Snap a photo and Catspace reads relaxed, happy, curious, fearful, or aggressive in seconds, then logs it
            to a cozy daily journal.
          </p>
          <div className="hero-ctas">
            <StoreButton />
            <span className="meta-line">Free · iOS 17.6+ · 7.1 MB</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="mascot-stage">
            <img src={LOGO_SRC} alt="Catspace mascot" />
          </div>
        </div>
      </div>
    </section>
  );
}
