import { useState } from "react";
import Navigation from "@/components/ui/navigation";
import Hero from "@/components/ui/hero";
import Footer from "@/components/ui/footer";
import DesignSection from "@/components/sections/DesignSection";
import AnalysisSection from "@/components/sections/AnalysisSection";
import ListingsSection from "@/components/sections/ListingsSection";
import StudiesSection from "@/components/sections/StudiesSection";
import type { ActiveSection } from "@/types";

export default function Home() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('design');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'design':
        return <DesignSection />;
      case 'analysis':
        return <AnalysisSection />;
      case 'listings':
        return <ListingsSection />;
      case 'studies':
        return <StudiesSection />;
      default:
        return <DesignSection />;
    }
  };

  return (
    <div className="app-container gradient-bg">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <Hero />
      <main className="relative mobile-first">
        <div className="slide-up">
          {renderActiveSection()}
        </div>
      </main>
      <Footer />
    </div>
  );
}
