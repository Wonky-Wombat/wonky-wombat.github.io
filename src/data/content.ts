export interface Plan {
  tag: string;
  price: string;
  priceSuffix?: string;
  note?: string;
  cta?: string;
  highlighted?: boolean;
  perks: readonly string[];
}

export const PLANS: readonly Plan[] = [
  {
    tag: "Free",
    price: "$0",
    perks: [
      "Mood diary with notes and photos",
      "Calendar and Days in a Row",
      "A diary for each of your cats",
      "Daily reminder",
      "3 mood scans a day, right on your iPhone",
    ],
  },
  {
    tag: "Catspace Pro",
    price: "$2.99",
    priceSuffix: "/ month",
    note: "7-day free trial",
    cta: "Get Catspace Pro",
    highlighted: true,
    perks: [
      "Mood Insights: trends, patterns, and all your cats side by side",
      "Add Past Moments from your photo library",
      "Scans that learn your cat",
      "Unlimited mood scans",
      "Up to 3 detailed AI mood analyses a day",
    ],
  },
];
