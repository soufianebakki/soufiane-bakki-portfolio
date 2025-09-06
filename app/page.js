import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import GlowCardsSection from "./components/GlowCardsSection"; // client component

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  const filtered = data
    .filter((item) => item?.cover_image)
    .sort(() => Math.random() - 0.5);
  return filtered;
}

export default async function Home() {
  const blogs = await getData();

  // Unique identifiers for glow cards
  const glowCards = [
    { id: "card-1", content: "Glow Card 1" },
    { id: "card-2", content: "Glow Card 2" },
    { id: "card-3", content: "Glow Card 3" },
    { id: "card-4", content: "Glow Card 4" },
  ];

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />

      {/* Render client-only Glow cards with unique identifiers */}
      <GlowCardsSection cards={glowCards} />
    </div>
  );
}
