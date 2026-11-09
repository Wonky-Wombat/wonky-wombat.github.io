const SCREENSHOTS = [
  {
    src: "/screenshots/phone-01.webp",
    alt: "The diary home with a calendar of moods",
    title: (
      <>
        A <em>Mood Diary</em>
        <br />
        For Your Cat
      </>
    ),
    sub: "Log how they feel and watch the month fill up.",
  },
  {
    src: "/screenshots/phone-02.webp",
    alt: "Choosing one of five moods on the Log Mood screen",
    title: (
      <>
        Log a Mood
        <br />
        <em>In Seconds</em>
      </>
    ),
    sub: "Five moods, plus an optional note or photo.",
  },
  {
    src: "/screenshots/phone-03.webp",
    alt: "A mood suggestion for a cat photo",
    title: (
      <>
        Not Sure?
        <br />
        <em>Scan a Photo</em>
      </>
    ),
    sub: "Get a mood suggestion. You make the final call.",
  },
  {
    src: "/screenshots/phone-04.webp",
    alt: "Mood trends and patterns on the Insights screen",
    title: (
      <>
        See Your Cat's
        <br />
        <em>Mood Over Time</em>
      </>
    ),
    sub: "Trends and patterns with Catspace Pro.",
  },
  {
    src: "/screenshots/phone-05.webp",
    alt: "Diary entries with notes and photos",
    title: (
      <>
        Keep Every
        <br />
        <em>Little Moment</em>
      </>
    ),
    sub: "Stored on your iPhone. No account needed.",
  },
];

export default function AppScreenshots() {
  return (
    <section className="slides-section" aria-label="App screenshots">
      <div className="slides">
        {SCREENSHOTS.map((shot) => (
          <figure className="slide" key={shot.src}>
            <figcaption>
              <h3>{shot.title}</h3>
              <p>{shot.sub}</p>
            </figcaption>
            <img src={shot.src} alt={shot.alt} loading="lazy" width={720} height={1355} />
          </figure>
        ))}
      </div>
    </section>
  );
}
