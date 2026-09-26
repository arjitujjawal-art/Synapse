// KORTEX — Mock Study Data
// Predefined demo data for frontend prototype

import { StrokeAnalysis, QualityCheck, ProcessingStep } from "./types";

export const MOCK_ANALYSIS: StrokeAnalysis = {
  studyId: "KTX-2026-0847",
  qualityScore: 87,
  coreVolumeMl: 18.4,
  penumbraVolumeMl: 52.7,
  mismatchVolumeMl: 34.3,
  mismatchRatio: 2.86,
  confidence: 91,
  affectedHemisphere: "left",
  boundaryUncertainty: "Moderate",
  findings: [
    "A suspected ischemic region is visualized in the left cerebral hemisphere.",
    "Estimated core volume: 18.4 mL",
    "Estimated penumbra volume: 52.7 mL",
    "The mismatch volume of 34.3 mL suggests a significant region of potentially salvageable tissue.",
    "The model indicates higher confidence in the central lesion region with moderate uncertainty around the posterior boundary margin.",
    "This result is intended for research and decision support only.",
  ],
};

export const MOCK_QUALITY: QualityCheck = {
  imageIntegrity: "Passed",
  orientation: "Valid",
  sliceContinuity: "Good",
  motion: "Low",
  studyQuality: 87,
};

export const PROCESSING_STEPS: ProcessingStep[] = [
  { id: "prepare", label: "Preparing Study", status: "pending" },
  { id: "quality", label: "Quality Check", status: "pending" },
  { id: "preprocess", label: "Preprocessing", status: "pending" },
  { id: "segment", label: "Running Segmentation", status: "pending" },
  { id: "quantify", label: "Calculating Volumes", status: "pending" },
  { id: "confidence", label: "Estimating Confidence", status: "pending" },
  { id: "report", label: "Generating AI Findings", status: "pending" },
];

// Scan images available in the public directory
export const SCAN_IMAGES = [
  "/scans/scan-1.jpeg",
  "/scans/scan-2.jpeg",
  "/scans/scan-3.jpeg",
  "/scans/scan-4.jpeg",
  "/scans/scan-5.jpeg",
  "/scans/scan-6.jpeg",
  "/scans/scan-7.jpeg",
];

export const AI_REPORT = {
  title: "AI Findings Report",
  studyId: "KTX-2026-0847",
  date: new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }),
  location: "Left cerebral hemisphere",
  observation:
    "The analysis highlights a suspected ischemic region with a smaller central core and a larger surrounding penumbral region. Higher model confidence is observed in the central lesion zone, with moderate boundary uncertainty along the posterior margin.",
  uncertaintyNote:
    "Moderate boundary uncertainty is present along the posterior margin. The confidence-weighted boundaries suggest a transition zone of approximately 4–6mm where core and penumbra classifications overlap.",
  disclaimer:
    "KORTEX is a research and decision-support prototype. AI-generated measurements and findings require review by a qualified healthcare professional. These outputs are not intended to replace clinical judgment or serve as a basis for treatment decisions.",
};
