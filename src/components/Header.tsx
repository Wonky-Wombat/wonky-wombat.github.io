import { APP_STORE_URL, LOGO_SRC } from "../data/site";

export default function Header() {
  return (
    <header>
      <div className="nav">
        <div className="brand">
          <img src={LOGO_SRC} alt="Catspace logo" />
          <span>Catspace</span>
        </div>
        <a className="nav-cta" href={APP_STORE_URL} target="_blank" rel="noopener">
          Get the app
        </a>
      </div>
    </header>
  );
}
