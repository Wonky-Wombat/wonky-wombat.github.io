export default function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="section-head">
      <div className="kicker">{kicker}</div>
      <h2>{title}</h2>
    </div>
  );
}
