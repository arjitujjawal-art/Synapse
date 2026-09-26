"use client";

import { useState, useRef, ChangeEvent, DragEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { UploadCloud, Folder, Plus, X, ArrowRight, Sparkles, FileImage } from "lucide-react";
import { useKortexStore } from "@/lib/store";
import { SCAN_IMAGES } from "@/lib/mock-study";

export default function StudyUploader() {
  const { uploadedImages, setUploadedImages, setPrototypeState } = useKortexStore();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const urls: string[] = [];
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        urls.push(URL.createObjectURL(file));
      }
    });
    if (urls.length > 0) {
      setUploadedImages([...uploadedImages, ...urls]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const loadDemoStudy = () => {
    setUploadedImages([...SCAN_IMAGES]);
  };

  const removeImage = (index: number) => {
    const updated = uploadedImages.filter((_, i) => i !== index);
    setUploadedImages(updated);
  };

  const startAnalysis = () => {
    if (uploadedImages.length === 0) return;
    setPrototypeState("processing");
  };

  const hasImages = uploadedImages.length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        multiple
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
      />

      {!hasImages ? (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-3xl p-12 md:p-16 text-center cursor-pointer transition-all duration-300 relative group ${
            isDragging
              ? "border-accent bg-accent-soft/20 scale-[0.99]"
              : "border-border-soft bg-white/70 hover:border-black/20 hover:bg-white"
          }`}
        >
          <div className="w-16 h-16 rounded-3xl bg-black/[0.03] text-text-primary mx-auto flex items-center justify-center mb-6 group-hover:scale-105 group-hover:bg-accent-soft group-hover:text-accent transition-all duration-300">
            <UploadCloud size={32} />
          </div>

          <h3 className="text-2xl font-semibold text-text-primary tracking-tight mb-2">
            Upload Brain Imaging Study
          </h3>
          <p className="body-medium text-text-secondary max-w-md mx-auto mb-8">
            Drop axial slice series here, or click to browse image files from your computer.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="btn-secondary text-sm py-2.5 px-6"
            >
              <Folder size={16} />
              Browse Files
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                loadDemoStudy();
              }}
              className="btn-primary text-sm py-2.5 px-6"
            >
              <Sparkles size={16} />
              Load Sample Study (7 Slices)
            </button>
          </div>

          <div className="text-xs text-text-tertiary flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
            <span>Supported in prototype: PNG · JPG · JPEG</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-text-tertiary/80">DICOM &amp; NIfTI ready with backend</span>
          </div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl border border-border-soft p-8 md:p-10 shadow-sm"
        >
          {/* Header of Detected Study */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-border-soft gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono uppercase tracking-wider font-semibold text-accent px-2.5 py-1 bg-accent-soft rounded-full">
                  Study Detected
                </span>
                <span className="text-xs text-text-tertiary font-mono">
                  CT Perfusion Series
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary mt-2">
                KTX-2026-0847 — Brain Axials
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold px-3 py-1.5 rounded-full bg-black/5 text-text-primary">
                {uploadedImages.length} Slices
              </span>
              <button
                type="button"
                onClick={() => setUploadedImages([])}
                className="text-xs text-text-tertiary hover:text-red-500 transition-colors p-2"
              >
                Clear all
              </button>
            </div>
          </div>

          {/* Slices Thumbnail Strip */}
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase text-text-tertiary tracking-wider block mb-4">
              Series Sequence ({uploadedImages.length} slices)
            </span>
            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scrollbar-thin">
              {uploadedImages.map((src, i) => (
                <div
                  key={i}
                  className="relative flex-shrink-0 w-28 h-28 rounded-2xl overflow-hidden border border-border-soft bg-black/5 group snap-start"
                >
                  <Image
                    src={src}
                    alt={`Slice ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="p-1.5 rounded-full bg-white/90 text-text-primary hover:bg-white hover:text-red-600 transition-colors"
                      title="Remove slice"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="absolute bottom-1.5 left-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/70 text-white font-semibold">
                    #{i + 1}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 w-28 h-28 rounded-2xl border-2 border-dashed border-border-soft hover:border-black/20 flex flex-col items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
              >
                <Plus size={20} className="mb-1" />
                <span className="text-xs font-medium">Add Slice</span>
              </button>
            </div>
          </div>

          {/* Pre-Check Verification Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-bg-primary border border-border-soft mb-8">
            <div>
              <span className="text-xs text-text-tertiary block">Format</span>
              <span className="text-sm font-semibold text-text-primary">Axial Bitmap</span>
            </div>
            <div>
              <span className="text-xs text-text-tertiary block">Continuity</span>
              <span className="text-sm font-semibold text-emerald-600">Aligned</span>
            </div>
            <div>
              <span className="text-xs text-text-tertiary block">Target Organ</span>
              <span className="text-sm font-semibold text-text-primary">Cerebral Tissue</span>
            </div>
            <div>
              <span className="text-xs text-text-tertiary block">Readiness</span>
              <span className="text-sm font-semibold text-accent">Ready for Inference</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-text-tertiary">
              Click Start Analysis to run automated segmentation and volumetric quantification.
            </span>
            <button
              type="button"
              onClick={startAnalysis}
              className="btn-primary w-full sm:w-auto"
            >
              <span>Start Analysis</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
