import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import StrokeBasics from "@/components/about/StrokeBasics";
import Pipeline from "@/components/about/Pipeline";
import Architecture from "@/components/about/Architecture";
import Safety from "@/components/about/Safety";

export const metadata: Metadata = {
  title: "About — KORTEX Stroke Intelligence",
  description: "Learn how KORTEX visualizes ischemic core and penumbra, quantifies lesion volumes, surfaces confidence, and assists clinical workflows.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StrokeBasics />
      <Pipeline />
      <Architecture />
      <Safety />
    </>
  );
}
