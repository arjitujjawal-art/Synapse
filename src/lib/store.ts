// KORTEX — Global Store (Zustand)
// Separates UI state from analysis data

import { create } from "zustand";
import { OverlayMode, ProcessingStep, StrokeAnalysis, ViewOrientation } from "./types";
import { MOCK_ANALYSIS, PROCESSING_STEPS } from "./mock-study";

type PrototypeState = "idle" | "uploaded" | "processing" | "results";

interface KortexStore {
  // Navigation
  currentPage: "home" | "about" | "prototype";
  setCurrentPage: (page: "home" | "about" | "prototype") => void;

  // Prototype state
  prototypeState: PrototypeState;
  setPrototypeState: (state: PrototypeState) => void;

  // Upload
  uploadedImages: string[];
  setUploadedImages: (images: string[]) => void;

  // Processing
  processingSteps: ProcessingStep[];
  setProcessingSteps: (steps: ProcessingStep[]) => void;

  // Viewer
  overlayMode: OverlayMode;
  setOverlayMode: (mode: OverlayMode) => void;
  currentSlice: number;
  totalSlices: number;
  setCurrentSlice: (slice: number) => void;
  viewOrientation: ViewOrientation;
  setViewOrientation: (orientation: ViewOrientation) => void;
  overlayOpacity: number;
  setOverlayOpacity: (opacity: number) => void;
  zoom: number;
  setZoom: (zoom: number) => void;

  // Results
  analysis: StrokeAnalysis | null;
  setAnalysis: (analysis: StrokeAnalysis | null) => void;

  // Reset
  resetPrototype: () => void;
}

export const useKortexStore = create<KortexStore>((set) => ({
  currentPage: "home",
  setCurrentPage: (page) => set({ currentPage: page }),

  prototypeState: "idle",
  setPrototypeState: (state) => set({ prototypeState: state }),

  uploadedImages: [],
  setUploadedImages: (images) => set({ uploadedImages: images }),

  processingSteps: PROCESSING_STEPS.map((s) => ({ ...s })),
  setProcessingSteps: (steps) => set({ processingSteps: steps }),

  overlayMode: "raw",
  setOverlayMode: (mode) => set({ overlayMode: mode }),
  currentSlice: 1,
  totalSlices: 7,
  setCurrentSlice: (slice) => set({ currentSlice: slice }),
  viewOrientation: "axial",
  setViewOrientation: (orientation) => set({ viewOrientation: orientation }),
  overlayOpacity: 0.6,
  setOverlayOpacity: (opacity) => set({ overlayOpacity: opacity }),
  zoom: 1,
  setZoom: (zoom) => set({ zoom }),

  analysis: null,
  setAnalysis: (analysis) => set({ analysis }),

  resetPrototype: () =>
    set({
      prototypeState: "idle",
      uploadedImages: [],
      processingSteps: PROCESSING_STEPS.map((s) => ({ ...s })),
      overlayMode: "raw",
      currentSlice: 1,
      zoom: 1,
      overlayOpacity: 0.6,
      analysis: null,
    }),
}));
