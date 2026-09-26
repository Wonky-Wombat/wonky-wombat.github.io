export type MoodLabel = "Relaxed" | "Happy" | "Curious" | "Fearful" | "Aggressive";

export interface Mood {
  label: MoodLabel;
  /** CSS custom property (defined in global.css) holding this mood's color. */
  colorVar: `--mood-${string}`;
  cues: string;
}

export const MOODS: readonly Mood[] = [
  { label: "Relaxed", colorVar: "--mood-relaxed", cues: "Soft ears, slow blinks, loose posture." },
  { label: "Happy", colorVar: "--mood-happy", cues: "Bright eyes, forward ears, an easy face." },
  { label: "Curious", colorVar: "--mood-curious", cues: "Wide eyes, alert ears, leaning in." },
  { label: "Fearful", colorVar: "--mood-fearful", cues: "Flattened ears, dilated pupils, tense." },
  { label: "Aggressive", colorVar: "--mood-aggressive", cues: "Pinned ears, fixed stare, coiled body." },
];

export function moodColorVar(label: MoodLabel): Mood["colorVar"] {
  // MOODS covers every MoodLabel, so the lookup cannot miss.
  return MOODS.find((mood) => mood.label === label)!.colorVar;
}
