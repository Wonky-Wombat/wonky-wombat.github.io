import { MOODS, moodImage } from "../data/moods";
import SectionHead from "./SectionHead";

export default function MoodCards() {
  return (
    <section>
      <SectionHead
        title={
          <>
            Five Moods, <em>One Diary</em>
          </>
        }
      />
      <div className="moods">
        {MOODS.map((mood) => (
          <div className="mood-card" key={mood.label}>
            <img src={moodImage(mood.label)} alt="" loading="lazy" width={360} height={360} />
            <h3>{mood.label}</h3>
            <p>{mood.cues}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
