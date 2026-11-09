import type { ReactNode } from "react";

export default function SectionHead({ title, sub }: { title: ReactNode; sub?: string }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {sub && <p>{sub}</p>}
    </div>
  );
}
