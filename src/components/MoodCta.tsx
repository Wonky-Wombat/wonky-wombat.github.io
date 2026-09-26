import StoreButton from "./StoreButton";

export default function MoodCta() {
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="mood-cta">
        <div>
          <h2>Want to know what they're really feeling?</h2>
          <p>The full mood scanner lives in the free Catspace app.</p>
        </div>
        <StoreButton />
      </div>
    </section>
  );
}
