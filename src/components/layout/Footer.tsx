"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border-soft bg-bg-secondary">
      <div className="container-narrow py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-[15px] font-semibold tracking-[-0.01em]">
              KORTEX
            </span>
            <p className="text-[13px] text-text-tertiary">
              From scans to stroke intelligence.
            </p>
          </div>

          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-[13px] text-text-secondary hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-[13px] text-text-secondary hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link
              href="/prototype"
              className="text-[13px] text-text-secondary hover:text-accent transition-colors"
            >
              Prototype
            </Link>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border-soft">
          <p className="text-[12px] text-text-tertiary text-center leading-relaxed max-w-2xl mx-auto">
            KORTEX is a research and decision-support prototype. AI-generated
            measurements and findings require review by a qualified healthcare
            professional. This interface is not a medical device and does not
            provide clinical diagnoses.
          </p>
        </div>
      </div>
    </footer>
  );
}
