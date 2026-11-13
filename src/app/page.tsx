import AppScreenshots from "../components/AppScreenshots";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import MoodCards from "../components/MoodCards";
import Pricing from "../components/Pricing";
import PreviewVideo from "../components/PreviewVideo";

export default function Home() {
  return (
    <>
      <div className="sky">
        <Header />
        <Hero />
      </div>
      <div className="wrap">
        <PreviewVideo />
        <AppScreenshots />
        <MoodCards />
        <Pricing />
        <Footer />
      </div>
    </>
  );
}
