import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection/HeroSection";
import AuthoritySection from "./components/AuthoritySection/AuthoritySection";
import ComparisonSection from "./components/ComparisonSection/ComparisonSection";
import ContentCards from "./components/ContentCards/ContentCards";
import SocialProof from "./components/SocialProof/SocialProof";
import GuaranteeSection from "./components/GuaranteeSection/GuaranteeSection";
import SpecialistSection from "./components/SpecialistSection/SpecialistSection";
import Footer from "./components/Footer/Footer";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import "./App.css";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [contentUnlocked, setContentUnlocked] = useState(false);

  // Function to unlock content (called when video reaches 80%)
  const handleVideoProgress = (progress: number) => {
    if (progress >= 80 && !contentUnlocked) {
      setContentUnlocked(true);
    }
  };

  useEffect(() => {
    if (!contentUnlocked) return;

    // Initialize scroll animations only after content is unlocked
    const sections = document.querySelectorAll(".animate-section");

    sections.forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 60,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [contentUnlocked]);

  return (
    <div className="app">
      <HeroSection onVideoProgress={handleVideoProgress} />

      {/* Content sections - only visible after 80% of video watched */}
      <div
        className={`content-gate ${contentUnlocked ? "unlocked" : "locked"}`}
      >
        <AuthoritySection />
        <ComparisonSection />
        <ContentCards />
        <SocialProof />
        <GuaranteeSection />
        <SpecialistSection />
        <Footer />
      </div>

      {/* Lock overlay when content is not yet unlocked */}
      {!contentUnlocked && (
        <div className="content-lock-message">
          <div className="lock-icon">🔒</div>
          <p>Continue assistindo o vídeo para desbloquear o conteúdo</p>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />
    </div>
  );
}

export default App;
