import { APP_STORE_URL, LEGAL_LINKS } from "../data/site";

export default function Footer() {
  return (
    <footer>
      <div className="legal-links">
        {LEGAL_LINKS.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      Catspace is made by Jenflow Interactive Inc. · Requires iOS 17.6 or later ·{" "}
      <a href={APP_STORE_URL} target="_blank" rel="noopener">
        View on the App Store
      </a>
    </footer>
  );
}
