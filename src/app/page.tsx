import HeroSection from "@/components/HeroSection";
import ShowReelSection from "@/components/ShowReelSection";
import SkillsSection from "@/components/SkillsSection";
import ServicesSection from "@/components/ServicesSection";
import ProjectsSection from "@/components/ProjectsSection";
import AboutSection from "@/components/AboutSection";
// import ExperienceSection from "@/components/ExperienceSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ConnectSection from "@/components/ConnectSection";
import ClientsSection from "@/components/ClientsSection";
import { ThemeToggle } from "@/components/ThemeToggle";
import prisma from "@/lib/db";

export default async function Home() {
  const siteSettings = await prisma.siteSettings.findUnique({
    where: { id: "global" }
  });

  const clients = siteSettings?.showClients
    ? await prisma.client.findMany({
        orderBy: [{ displayOrder: "asc" }, { createdAt: "desc" }],
      })
    : [];

  return (
    <main className="min-h-screen relative">
      <ThemeToggle />
      <HeroSection />
      {siteSettings?.showReelUrl && (
        <ShowReelSection 
          url={siteSettings.showReelUrl} 
          thumbnail={siteSettings.showReelThumbnail} 
        />
      )}
      <ProjectsSection />
      <SkillsSection />
      <ServicesSection />
      {siteSettings?.showClients && clients.length > 0 && (
        <ClientsSection clients={clients} />
      )}
      <AboutSection />
      {/* <ExperienceSection /> */}
      <TestimonialsSection />
      <ConnectSection />
    </main>
  );
}
