import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Treatments from "@/components/Treatments";
import Cinema from "@/components/Cinema";
import Technology from "@/components/Technology";
import Results from "@/components/Results";
import About from "@/components/About";
import FinalCTA from "@/components/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Manifesto />
        <Treatments />
        <Cinema />
        <Technology />
        <Results />
        <About />
        <FinalCTA />
      </main>
    </>
  );
}
