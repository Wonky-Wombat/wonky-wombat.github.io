export interface Step {
  title: string;
  body: string;
}

export interface Feature {
  icon: string;
  title: string;
  body: string;
}

export interface Plan {
  tag: string;
  price: string;
  priceSuffix?: string;
  highlighted?: boolean;
  perks: readonly string[];
}

export const STEPS: readonly Step[] = [
  {
    title: "Snap or upload",
    body: "Use the camera or your photo library. No special angle or lighting needed.",
  },
  {
    title: "AI reads the expression",
    body: "Catspace analyzes ears, eyes, and posture and returns a mood in seconds. Photos are discarded right after.",
  },
  {
    title: "Saved to the journal",
    body: "Every scan lands in a daily mood journal, so a bad vet day or a happy nap streak is easy to look back on.",
  },
];

export const FEATURES: readonly Feature[] = [
  { icon: "⚡", title: "Instant AI scan", body: "A full five-emotion read in seconds. No waiting, no setup." },
  { icon: "📓", title: "Daily mood journal", body: "Every scan is logged automatically, building a timeline of your cat's moods." },
  { icon: "⚙️", title: "Quick Scan shortcut", body: "Jump straight to the camera from your Home Screen." },
  { icon: "🔗", title: "Shareable mood cards", body: "Turn a scan into a clean profile card, ready for Instagram or group chats." },
  { icon: "🔒", title: "Privacy-first", body: "Photos are processed for inference and then discarded. No account required." },
  { icon: "🚫", title: "Ad-free", body: "No banners, no interstitials." },
];

export const PLANS: readonly Plan[] = [
  {
    tag: "Free",
    price: "$0",
    perks: ["Limited daily mood scans", "Daily mood journal", "Shareable mood cards", "No account required"],
  },
  {
    tag: "Catspace Pro",
    price: "$2.99",
    priceSuffix: "/ month",
    highlighted: true,
    perks: ["Unlimited mood scans", "Everything in Free", "Priority AI processing", "Support an indie cat app 🐾"],
  },
];
