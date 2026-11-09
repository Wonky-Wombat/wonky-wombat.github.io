"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MOODS, moodImage } from "../data/moods";

const CENTER = (MOODS.length - 1) / 2;
const DECODE_TIMEOUT_MS = 1500;

function itemStyle(index: number): CSSProperties {
  const distance = index - CENTER;
  return {
    "--drop": distance * distance,
    "--z": MOODS.length - Math.abs(distance),
    "--enter": `${index * 0.09}s`,
    "--phase": `${index * 0.22}s`,
  } as CSSProperties;
}

export default function MoodArc() {
  const arc = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const reveal = () => {
      if (!cancelled) {
        setReady(true);
      }
    };
    const timer = setTimeout(reveal, DECODE_TIMEOUT_MS);
    const images = Array.from(arc.current?.querySelectorAll("img") ?? []);
    void Promise.allSettled(images.map((image) => image.decode?.())).then(reveal);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div
      ref={arc}
      className={ready ? "arc is-ready" : "arc"}
      role="img"
      aria-label="Five cat faces: relaxed, happy, curious, fearful, and aggressive"
    >
      <noscript>
        <style>{".arc-item{opacity:1}"}</style>
      </noscript>
      <div className="arc-layer">
        {MOODS.map((mood, index) => (
          <span className="arc-item" key={mood.label} style={itemStyle(index)}>
            <span className="arc-float arc-disc" />
          </span>
        ))}
      </div>
      <div className="arc-layer arc-art">
        {MOODS.map((mood, index) => (
          <span className="arc-item" key={mood.label} style={itemStyle(index)}>
            <span className="arc-float">
              <img src={moodImage(mood.label)} alt="" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
