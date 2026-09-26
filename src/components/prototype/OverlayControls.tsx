"use client";

import { useKortexStore } from "@/lib/store";
import { OverlayMode, ViewOrientation } from "@/lib/types";
import { RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

export default function OverlayControls() {
  const {
    overlayMode,
    setOverlayMode,
    viewOrientation,
    setViewOrientation,
    overlayOpacity,
    setOverlayOpacity,
    zoom,
    setZoom,
  } = useKortexStore();

  const MODES: { id: OverlayMode; label: string; badgeColor?: string }[] = [
    { id: "raw", label: "Raw Scan" },
    { id: "core", label: "Core", badgeColor: "#E53935" },
    { id: "penumbra", label: "Penumbra", badgeColor: "#2457F5" },
    { id: "combined", label: "Combined" },
    { id: "uncertainty", label: "Uncertainty", badgeColor: "#F59E0B" },
  ];

  const ORIENTATIONS: { id: ViewOrientation; label: string }[] = [
    { id: "axial", label: "Axial" },
    { id: "coronal", label: "Coronal" },
    { id: "sagittal", label: "Sagittal" },
  ];

  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-border-soft shadow-xs">
      {/* Overlay Mode Switcher */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-bg-primary rounded-xl border border-border-soft">
        {MODES.map((m) => {
          const isActive = overlayMode === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setOverlayMode(m.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${
                isActive
                  ? "bg-white text-text-primary shadow-xs font-semibold"
                  : "text-text-secondary hover:text-text-primary hover:bg-white/50"
              }`}
            >
              {m.badgeColor && (
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: m.badgeColor }}
                />
              )}
              {m.label}
            </button>
          );
        })}
      </div>

      {/* Middle: Opacity Slider */}
      {overlayMode !== "raw" && (
        <div className="flex items-center gap-3 px-2">
          <span className="text-xs text-text-tertiary font-medium">Opacity</span>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.05"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
            className="w-24 h-1.5 bg-black/10 rounded-lg appearance-none cursor-pointer accent-accent"
          />
          <span className="text-xs font-mono text-text-secondary w-8 text-right">
            {Math.round(overlayOpacity * 100)}%
          </span>
        </div>
      )}

      {/* Right: View Orientation & Zoom */}
      <div className="flex items-center gap-3">
        {/* Orientation */}
        <div className="hidden md:flex items-center gap-1 p-1 bg-bg-primary rounded-xl border border-border-soft">
          {ORIENTATIONS.map((ori) => {
            const isSelected = viewOrientation === ori.id;
            return (
              <button
                key={ori.id}
                type="button"
                onClick={() => setViewOrientation(ori.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isSelected
                    ? "bg-white text-text-primary shadow-xs font-semibold"
                    : "text-text-tertiary hover:text-text-primary"
                }`}
              >
                {ori.label}
              </button>
            );
          })}
        </div>

        {/* Zoom controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setZoom(Math.max(0.7, zoom - 0.15))}
            className="p-1.5 rounded-lg hover:bg-black/5 text-text-secondary transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span className="text-xs font-mono text-text-tertiary w-10 text-center">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoom(Math.min(2.5, zoom + 0.15))}
            className="p-1.5 rounded-lg hover:bg-black/5 text-text-secondary transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          {zoom !== 1 && (
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="p-1.5 rounded-lg hover:bg-black/5 text-text-tertiary hover:text-text-primary transition-colors"
              title="Reset Zoom"
            >
              <RotateCcw size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
