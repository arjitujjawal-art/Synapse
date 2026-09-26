import Hero from "@/components/home/Hero";
import Problem from "@/components/home/Problem";
import CorePenumbra from "@/components/home/CorePenumbra";
import Workflow from "@/components/home/Workflow";
import Impact from "@/components/home/Impact";
import Innovation from "@/components/home/Innovation";
import Scalability from "@/components/home/Scalability";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <Problem />
      <CorePenumbra />
      <Workflow />
      <Impact />
      <Innovation />
      <Scalability />
      <FinalCTA />
    </div>
  );
}
