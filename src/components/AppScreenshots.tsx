import SectionHead from "./SectionHead";

const SCREENSHOTS = [
  { src: "/screenshots/scan.png", alt: "Scanning a cat photo in the Catspace app" },
  { src: "/screenshots/breed-result.png", alt: "A cat breed result in the Catspace app" },
  { src: "/screenshots/mood-result.png", alt: "A cat mood result in the Catspace app" },
  { src: "/screenshots/history.png", alt: "Scan history in the Catspace app" },
];

export default function AppScreenshots() {
  return (
    <section style={{ paddingTop: 0 }}>
      <SectionHead kicker="Inside the app" title="See Catspace in action" />
      <div className="screenshot-row">
        {SCREENSHOTS.map((shot) => (
          <img key={shot.src} src={shot.src} alt={shot.alt} loading="lazy" />
        ))}
      </div>
    </section>
  );
}
