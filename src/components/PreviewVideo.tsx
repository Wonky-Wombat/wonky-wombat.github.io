import SectionHead from "./SectionHead";

export default function PreviewVideo() {
  return (
    <section className="preview-section">
      <SectionHead
        title={
          <>
            See It <em>in Action</em>
          </>
        }
        sub="From a quick log to a photo scan to your cat's mood over time."
      />
      <div className="preview-frame">
        <video
          src="/video/catspace-preview.mp4"
          poster="/video/catspace-preview-poster.jpg"
          aria-label="Catspace app preview video"
          width={664}
          height={1440}
          autoPlay
          muted
          loop
          playsInline
          controls
          preload="metadata"
        />
      </div>
    </section>
  );
}
