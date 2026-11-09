import MoodArc from "./MoodArc";
import StoreButton from "./StoreButton";

export default function Hero() {
  return (
    <section className="hero">
      <span className="pill">New in 3.0.0</span>
      <h1>
        A <em>Mood Diary</em>{" "}
        <br />
        For Your Cat
      </h1>
      <p className="hero-sub">Log how they feel in seconds, scan a photo when you're not sure, and watch the month fill up.</p>
      <div className="hero-ctas">
        <StoreButton />
      </div>
      <MoodArc />
    </section>
  );
}
