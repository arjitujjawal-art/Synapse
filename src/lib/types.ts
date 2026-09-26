// KORTEX — Core Types
// Typed data objects for backend integration readiness

export type StrokeAnalysis = {
  studyId: string;
  qualityScore: number;
  coreVolumeMl: number;
  penumbraVolumeMl: number;
  mismatchVolumeMl: number;
  mismatchRatio: number | null;
  confidence: number;
  affectedHemisphere: "left" | "right" | "unknown";
  findings: string[];
  boundaryUncertainty: "Low" | "Moderate" | "High";
};

export type QualityCheck = {
  imageIntegrity: "Passed" | "Failed";
  orientation: "Valid" | "Invalid";
  sliceContinuity: "Good" | "Fair" | "Poor";
  motion: "Low" | "Moderate" | "High";
  studyQuality: number;
};

export type ProcessingStep = {
  id: string;
  label: string;
  status: "pending" | "running" | "complete";
};

export type OverlayMode = "raw" | "core" | "penumbra" | "combined" | "uncertainty";

export type ViewOrientation = "axial" | "coronal" | "sagittal";

export type UploadedStudy = {
  images: File[];
  imageCount: number;
  studyName: string;
  modality: string;
};
