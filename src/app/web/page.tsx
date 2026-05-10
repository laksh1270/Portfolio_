import WebHeroSection from "@/components/web/WebHeroSection";
import WebAboutSection from "@/components/web/WebAboutSection";
import WebSkillsSection from "@/components/web/WebSkillsSection";
import WebProjectsSection from "@/components/web/WebProjectsSection";
import WebExperienceSection from "@/components/web/WebExperienceSection";
import WebServicesSection from "@/components/web/WebServicesSection";
import WebTestimonialsSection from "@/components/web/WebTestimonialsSection";
import ConnectSection from "@/components/ConnectSection";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function WebPortfolio() {
  return (
    <main className="min-h-screen relative">
      <ThemeToggle />
      <WebHeroSection />
      <WebAboutSection />
      <WebSkillsSection />
      <WebProjectsSection />
      <WebExperienceSection />
      <WebServicesSection />
      <WebTestimonialsSection />
      <ConnectSection />
    </main>
  );
}
