import { APP_STORE_URL } from "../data/site";

export default function StoreButton({ style }: { style?: React.CSSProperties }) {
  return (
    <a className="btn-store" style={style} href={APP_STORE_URL} target="_blank" rel="noopener">
      <img src="/app-store-badge.svg" alt="Download on the App Store" />
    </a>
  );
}
