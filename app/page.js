import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";
import dynamic from "next/dynamic";

// Example client-side component using GlowCard
const GlowCard = dynamic(() => import("./components/helper/glow-card"), { ssr: false });

async function getData() {
  const res = await fetch(`https://dev.to/api/articles?username=${personalData.devUsername}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  // Filter articles with cover image and shuffle
  const filtered = data.filter((item) => item?.cover_image).sort(() => Math.random() - 0.5);

  return filtered;
}

export default async function Home() {
  const blogs = await getData();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />

      {/* Example client-side component */}
      <GlowCard identifier={1}>
        <h2 className="text-xl font-semibold mb-2">Client-side card</h2>
        <p>This content runs only on the browser</p>
      </GlowCard>

      <ContactSection />
    </div>
  );
}
