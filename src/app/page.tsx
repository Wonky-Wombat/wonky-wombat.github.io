import AppScreenshots from "../components/AppScreenshots";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import MoodCards from "../components/MoodCards";
import MoodCta from "../components/MoodCta";
import Pricing from "../components/Pricing";
import { GATEWAY_URL } from "../config";
import BreedDemo from "../features/breed/BreedDemo";

export default function Home() {
  return (
    <div className="wrap">
      <Header />
      <Hero />
      <HowItWorks />
      <MoodCards />
      <MoodCta />
      <AppScreenshots />
      {GATEWAY_URL && <BreedDemo gatewayUrl={GATEWAY_URL} />}
      <Features />
      <Pricing />
      <Footer />
    </div>
  );
}
