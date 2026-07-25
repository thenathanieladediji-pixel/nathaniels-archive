import Hero from "@/components/about/Hero";
import Intro from "@/components/about/Intro";
import Philosophy from "@/components/about/Philosophy";
import Process from "@/components/about/Process";

export default function AboutPage() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Intro />
      <Philosophy />
      <Process />
    </main>
  );
}