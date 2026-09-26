"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Activity, Angle, ArrowLeftToLine, Brush, Check, ChevronLeft, ChevronRight,
  Circle, Contrast, Crop, Download, Eraser, Eye, EyeOff, FlipHorizontal,
  Focus, Fullscreen, Hand, Info, Layers3, Lock, LockOpen, Maximize2,
  MousePointer2, Move, PanelRightClose, PanelRightOpen, PencilRuler, Redo2,
  RotateCcw, RotateCw, Save, ScanLine, Square, Tag, TextCursorInput, Undo2,
  WandSparkles, ZoomIn, ZoomOut,
} from "lucide-react";
import { useKortexStore } from "@/lib/store";
import { SCAN_IMAGES } from "@/lib/mock-study";

type Tool = "pan" | "window" | "zoom" | "rotate" | "ruler" | "angle" | "rect" | "ellipse" | "freehand" | "brush" | "eraser" | "note";
type LabelKey = "core" | "penumbra" | "uncertainty";

const PATIENTS = [
  { id: "KTX-0847", name: "Sumedh Kulkarni", age: 56, baseline: "/mri/mri-01.jpeg", followup: "/mri/mri-02.jpeg", baselineDate: "18 Sep 2026", intermediateDate: "22 Sep 2026", currentDate: "26 Sep 2026", trend: "+6.2 mL", status: "Increasing", lesion: { x: 322, y: 278, rx: 62, ry: 78, followup: 1.22 } },
  { id: "KTX-0851", name: "Karthik Prakash", age: 63, baseline: "/mri/mri-02.jpeg", followup: "/mri/mri-03.jpeg", baselineDate: "12 Sep 2026", intermediateDate: "19 Sep 2026", currentDate: "27 Sep 2026", trend: "+3.8 mL", status: "Increasing · saturated after midpoint", lesion: { x: 176, y: 238, rx: 72, ry: 58, followup: 1.16 } },
  { id: "KTX-0856", name: "Kushal Shah", age: 48, baseline: "/mri/mri-03.jpeg", followup: "/mri/mri-04.jpeg", baselineDate: "16 Sep 2026", intermediateDate: "21 Sep 2026", currentDate: "26 Sep 2026", trend: "+1.4 mL", status: "Stable", lesion: { x: 205, y: 188, rx: 52, ry: 66, followup: 1.05 } },
  { id: "KTX-0862", name: "Ananya Mehta", age: 59, baseline: "/mri/mri-04.jpeg", followup: "/mri/mri-05.jpeg", baselineDate: "10 Sep 2026", intermediateDate: "18 Sep 2026", currentDate: "28 Sep 2026", trend: "+5.1 mL", status: "Increasing · saturated after midpoint", lesion: { x: 340, y: 220, rx: 68, ry: 70, followup: 1.24 } },
  { id: "KTX-0868", name: "Rohan Iyer", age: 67, baseline: "/mri/mri-05.jpeg", followup: "/mri/mri-06-fixed.jpeg", baselineDate: "14 Sep 2026", intermediateDate: "20 Sep 2026", currentDate: "27 Sep 2026", trend: "+4.7 mL", status: "Increasing", lesion: { x: 165, y: 292, rx: 58, ry: 82, followup: 1.18 } },
];

const TOOL_GROUPS: { id: Tool; label: string; icon: typeof Hand }[][] = [
  [
    { id: "pan", label: "Pan / move", icon: Hand },
    { id: "window", label: "Window / level", icon: Contrast },
    { id: "zoom", label: "Zoom", icon: ZoomIn },
    { id: "rotate", label: "Rotate", icon: RotateCw },
  ],
  [
    { id: "ruler", label: "Linear measurement", icon: PencilRuler },
    { id: "angle", label: "Angle measurement", icon: Angle },
    { id: "rect", label: "Rectangle ROI", icon: Square },
    { id: "ellipse", label: "Ellipse ROI", icon: Circle },
    { id: "freehand", label: "Freehand ROI", icon: MousePointer2 },
  ],
  [
    { id: "brush", label: "Correction brush", icon: Brush },
    { id: "eraser", label: "Label eraser", icon: Eraser },
    { id: "note", label: "Pin annotation", icon: TextCursorInput },
  ],
];

const LABELS: { id: LabelKey; name: string; color: string }[] = [
  { id: "core", name: "Core", color: "#E53935" },
  { id: "penumbra", name: "Penumbra", color: "#2457F5" },
  { id: "uncertainty", name: "Uncertainty", color: "#F59E0B" },
];

function IconButton({ label, active = false, onClick, children }: { label: string; active?: boolean; onClick?: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-label={label} title={label} onClick={onClick}
      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? "bg-[#9D8BC8] text-white" : "text-neutral-400 hover:text-white hover:bg-white/10"}`}>
      {children}
    </button>
  );
}

export default function ScanWorkstation() {
  const { uploadedImages, currentSlice, setCurrentSlice, viewOrientation, setViewOrientation, resetPrototype } = useKortexStore();
  const images = uploadedImages.length ? uploadedImages : SCAN_IMAGES;
  const [activeTool, setActiveTool] = useState<Tool>("pan");
  const [recordView, setRecordView] = useState<"current" | "previous-1" | "previous-2" | "all">("current");
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [invert, setInvert] = useState(false);
  const [brushSize, setBrushSize] = useState(40);
  const [opacity, setOpacity] = useState(60);
  const [outline, setOutline] = useState(2);
  const [panelOpen, setPanelOpen] = useState(true);
  const [selectedLabel, setSelectedLabel] = useState<LabelKey>("core");
  const [visible, setVisible] = useState<Record<LabelKey, boolean>>({ core: true, penumbra: true, uncertainty: false });
  const [locked, setLocked] = useState<Record<LabelKey, boolean>>({ core: false, penumbra: false, uncertainty: true });
  const [saved, setSaved] = useState(false);
  const [memo, setMemo] = useState("Review posterior boundary before sign-off.");
  const [patientId, setPatientId] = useState(PATIENTS[0].id);
  const patient = PATIENTS.find(item => item.id === patientId) ?? PATIENTS[0];

  const resetView = () => { setZoom(1); setRotation(0); setBrightness(100); setContrast(100); setInvert(false); };
  const save = () => { setSaved(true); window.setTimeout(() => setSaved(false), 1800); };

  const midpoint = Math.ceil(images.length / 2);
  const subtleSliceOffset = currentSlice - midpoint;
  const subtleShiftX = subtleSliceOffset * 0.65;
  const subtleShiftY = Math.sin(currentSlice * 1.4) * 1.15;
  const subtleRotation = subtleSliceOffset * 0.1;
  const subtleScale = 1 + Math.cos(currentSlice * 0.8) * 0.0035;
  const scanStyle = {
    transform: `translate(${subtleShiftX}px, ${subtleShiftY}px) scale(${zoom * subtleScale}) rotate(${rotation + subtleRotation}deg)`,
    filter: `brightness(${brightness}%) contrast(${contrast}%) ${invert ? "invert(1)" : ""}`,
  };

  const saturatesAfterMidpoint = patient.id === "KTX-0851" || patient.id === "KTX-0862";
  const sliceDepth = saturatesAfterMidpoint
    ? currentSlice >= midpoint
      ? 1
      : Math.sin((Math.PI * currentSlice) / (2 * midpoint))
    : Math.sin((Math.PI * currentSlice) / (images.length + 1));

  const detectedPath = (x: number, y: number, rx: number, ry: number, variant: "penumbra" | "core") => {
    const p = variant === "penumbra"
      ? [[-.94,-.18],[-.72,-.64],[-.43,-.59],[-.25,-.98],[.08,-.82],[.34,-.96],[.55,-.57],[.91,-.42],[.74,-.05],[.98,.22],[.59,.38],[.68,.72],[.27,.63],[-.02,.94],[-.28,.69],[-.65,.78],[-.58,.36],[-.96,.21]]
      : [[-.88,-.08],[-.63,-.71],[-.23,-.57],[-.08,-.94],[.29,-.68],[.65,-.77],[.58,-.31],[.92,-.04],[.61,.22],[.76,.61],[.28,.53],[.03,.91],[-.22,.62],[-.68,.73],[-.59,.25],[-.91,.14]];
    const points = p.map(point => ({ x: x + point[0] * rx, y: y + point[1] * ry }));
    const midpointOf = (a: { x: number; y: number }, b: { x: number; y: number }) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
    const start = midpointOf(points[points.length - 1], points[0]);
    return `M ${start.x} ${start.y} ${points.map((point, index) => {
      const next = points[(index + 1) % points.length];
      const midpoint = midpointOf(point, next);
      return `Q ${point.x} ${point.y} ${midpoint.x} ${midpoint.y}`;
    }).join(" ")} Z`;
  };

  const overlayFor = (followup = false) => {
    const growth = followup ? patient.lesion.followup : 1;
    const rx = patient.lesion.rx * sliceDepth * growth;
    const ry = patient.lesion.ry * sliceDepth * growth;
    const coreRx = rx * 0.54;
    const coreRy = ry * 0.54;
    return (
      <svg viewBox="0 0 500 500" className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: Math.min(0.9, opacity / 82), mixBlendMode: "hard-light" }}>
        <defs>
          <clipPath id={`brain-mask-${followup ? "followup" : "baseline"}`}><ellipse cx="250" cy="254" rx="187" ry="214" /></clipPath>
          <filter id={`tissue-morph-${followup ? "followup" : "baseline"}`} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed={followup ? 9 : 5} result="tissueNoise" />
            <feDisplacementMap in="SourceGraphic" in2="tissueNoise" scale={followup ? 9 : 7} xChannelSelector="R" yChannelSelector="G" result="warped" />
            <feGaussianBlur in="warped" stdDeviation="2.05" />
          </filter>
          <radialGradient id={`penumbra-tissue-${followup ? "followup" : "baseline"}`} cx="48%" cy="46%" r="62%">
            <stop offset="0%" stopColor="#244AC7" stopOpacity="0.88" />
            <stop offset="70%" stopColor="#102A86" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#071B64" stopOpacity="0.42" />
          </radialGradient>
          <radialGradient id={`core-tissue-${followup ? "followup" : "baseline"}`} cx="46%" cy="43%" r="64%">
            <stop offset="0%" stopColor="#C9272C" stopOpacity="0.94" />
            <stop offset="65%" stopColor="#84141B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#540A10" stopOpacity="0.58" />
          </radialGradient>
        </defs>
        <g clipPath={`url(#brain-mask-${followup ? "followup" : "baseline"})`}>
          {visible.penumbra && <>
            <path d={detectedPath(patient.lesion.x, patient.lesion.y, rx, ry, "penumbra")} fill={`url(#penumbra-tissue-${followup ? "followup" : "baseline"})`} filter={`url(#tissue-morph-${followup ? "followup" : "baseline"})`} />
            <path d={detectedPath(patient.lesion.x, patient.lesion.y, rx, ry, "penumbra")} fill="none" stroke="#315BE0" strokeOpacity="0.58" strokeWidth={Math.max(1, outline * .55)} strokeDasharray="2 4" strokeLinecap="round" strokeLinejoin="round" />
          </>}
          {visible.core && <>
            <path d={detectedPath(patient.lesion.x + rx * .12, patient.lesion.y + ry * .08, coreRx, coreRy, "core")} fill={`url(#core-tissue-${followup ? "followup" : "baseline"})`} filter={`url(#tissue-morph-${followup ? "followup" : "baseline"})`} />
            <path d={detectedPath(patient.lesion.x + rx * .12, patient.lesion.y + ry * .08, coreRx, coreRy, "core")} fill="none" stroke="#B82027" strokeOpacity="0.66" strokeWidth={Math.max(1, outline * .62)} strokeLinecap="round" strokeLinejoin="round" />
          </>}
          {visible.uncertainty && <path d={detectedPath(patient.lesion.x, patient.lesion.y, rx + 8, ry + 8, "penumbra")} fill="none" stroke="#F59E0B" strokeWidth={outline + 1} strokeDasharray="8 5" />}
        </g>
      </svg>
    );
  };

  const mriStudy = (src: string, alt: string, withOverlay = false) => (
    <div className="relative w-[86%] h-[86%] transition-transform duration-200 overflow-hidden" style={scanStyle}>
      <Image src={src} alt={alt} fill priority className="object-contain" />
      {withOverlay && overlayFor(true)}
    </div>
  );

  const records = [
    { id: "current" as const, label: "Current MRI", date: patient.currentDate, src: patient.followup },
    { id: "previous-1" as const, label: "Previous MRI 01", date: patient.intermediateDate, src: patient.baseline },
    { id: "previous-2" as const, label: "Previous MRI 02", date: patient.baselineDate, src: PATIENTS[(PATIENTS.indexOf(patient) + 2) % PATIENTS.length].baseline },
  ];
  const activeRecord = records.find(record => record.id === recordView) ?? records[0];

  return (
    <div className="min-h-[calc(100vh-88px)] bg-[#0B0B0C] text-[#E6E6E6] rounded-[24px] overflow-hidden border border-white/[0.08] shadow-2xl">
      <header className="h-16 px-3 flex items-center justify-between gap-3 bg-[rgba(24,24,26,.94)] border-b border-white/[0.08] backdrop-blur-xl overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 border-r border-white/10">
            <p className="text-[11px] uppercase tracking-[.16em] text-neutral-500">KTX-2026-0847</p>
            <p className="text-sm font-medium">{viewOrientation[0].toUpperCase() + viewOrientation.slice(1)} · DWI</p>
          </div>
          {(["axial", "coronal", "sagittal"] as const).map((orientation) => <button key={orientation} onClick={() => setViewOrientation(orientation)} className={`px-3 py-2 rounded-lg text-xs capitalize ${viewOrientation === orientation ? "bg-white/10 text-white" : "text-neutral-500 hover:text-white"}`}>{orientation}</button>)}
          <IconButton label="Undo"><Undo2 size={17} /></IconButton><IconButton label="Redo"><Redo2 size={17} /></IconButton><IconButton label="Reset view" onClick={resetView}><RotateCcw size={17} /></IconButton>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <IconButton label="Rotate clockwise" onClick={() => setRotation(v => v + 90)}><RotateCw size={17} /></IconButton>
          <IconButton label="Flip horizontal"><FlipHorizontal size={17} /></IconButton>
          <IconButton label="Invert grayscale" active={invert} onClick={() => setInvert(v => !v)}><Contrast size={17} /></IconButton>
          <IconButton label="Crop"><Crop size={17} /></IconButton><IconButton label="Study information"><Info size={17} /></IconButton><IconButton label="Label manager"><Tag size={17} /></IconButton><IconButton label="Fullscreen"><Fullscreen size={17} /></IconButton><IconButton label="Download current view"><Download size={17} /></IconButton>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button type="button" className="h-9 px-3 rounded-lg border border-white/10 text-xs flex items-center gap-2 hover:bg-white/10"><WandSparkles size={15} /> Run AI</button>
          <button type="button" onClick={save} className="h-9 px-4 rounded-lg bg-[#9D8BC8] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#8b78ba]"><Save size={15} /> {saved ? "Saved" : "Save"} {saved && <Check size={14} />}</button>
          <button type="button" className="h-9 px-3 rounded-lg border border-white/10 text-xs">Skip</button>
          <button type="button" onClick={resetPrototype} className="h-9 px-3 text-xs text-neutral-400 hover:text-white">Exit</button>
        </div>
      </header>

      <div className={`grid ${panelOpen ? "grid-cols-[180px_64px_minmax(360px,1fr)] xl:grid-cols-[210px_74px_minmax(0,1fr)_320px]" : "grid-cols-[180px_64px_minmax(360px,1fr)] xl:grid-cols-[210px_74px_minmax(0,1fr)]"} min-h-[710px]`}>
        <aside className="bg-[#111113] border-r border-white/[0.08] p-3 overflow-y-auto max-h-[774px]">
          <div className="px-2 pt-2 pb-4 border-b border-white/[0.08]">
            <p className="text-[10px] uppercase tracking-[.16em] text-neutral-500">Patient queue</p>
            <p className="text-xs text-neutral-300 mt-1">5 active studies</p>
          </div>
          <div className="py-3 space-y-1.5">
            {PATIENTS.map((item, index) => (
              <button key={item.id} type="button" onClick={() => { setPatientId(item.id); setCurrentSlice(1); setRecordView("current"); }} className={`w-full p-3 rounded-xl text-left border transition-colors ${patientId === item.id ? "bg-white/[.08] border-[#9D8BC8]/50" : "border-transparent hover:bg-white/[.04]"}`}>
                <div className="flex items-center gap-3"><span className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold ${patientId === item.id ? "bg-[#9D8BC8] text-white" : "bg-white/[.07] text-neutral-400"}`}>{index + 1}</span><div className="min-w-0"><p className="text-xs font-medium text-neutral-200 truncate">{item.name}</p><p className="text-[10px] text-neutral-500 mt-0.5">{item.id} · {item.age} yrs</p></div></div>
                <div className="mt-3 flex items-center justify-between"><span className="text-[9px] text-neutral-500">Penumbra trend</span><span className={`text-[10px] font-mono ${item.status.startsWith("Increasing") ? "text-amber-400" : item.status === "Reducing" ? "text-emerald-400" : "text-neutral-400"}`}>{item.trend}</span></div>
              </button>
            ))}
          </div>
          <p className="px-2 pt-3 border-t border-white/[0.08] text-[9px] leading-relaxed text-neutral-600">Select a patient to open their longitudinal MRI record.</p>
        </aside>
        <aside className="bg-[rgba(24,24,26,.92)] border-r border-white/[0.08] flex flex-col items-center py-3">
          {TOOL_GROUPS.map((group, gi) => <div key={gi} className={`flex flex-col items-center gap-1 pb-3 mb-3 ${gi < TOOL_GROUPS.length - 1 ? "border-b border-white/10" : ""}`}>
            {group.map(tool => <IconButton key={tool.id} label={tool.label} active={activeTool === tool.id} onClick={() => setActiveTool(tool.id)}><tool.icon size={18} /></IconButton>)}
          </div>)}
          <div className="mt-auto w-full px-2 space-y-4 pb-3">
            {[{ label: "Brush", value: brushSize, set: setBrushSize, min: 4, max: 80 }, { label: "Opacity", value: opacity, set: setOpacity, min: 10, max: 100 }, { label: "Outline", value: outline, set: setOutline, min: 1, max: 8 }].map(item => <label key={item.label} className="block text-[9px] text-neutral-500 text-center">{item.label} {item.value}<input aria-label={item.label} type="range" min={item.min} max={item.max} value={item.value} onChange={e => item.set(Number(e.target.value))} className="w-full h-1 accent-[#9D8BC8]" /></label>)}
          </div>
        </aside>

        <main className="min-w-0 flex flex-col">
          <div className="relative flex-1 min-h-[590px] bg-[#080809] overflow-hidden select-none">
            {recordView === "all" ? (
              <div className="absolute inset-0 p-7 grid grid-cols-3 gap-4 items-center">
                {records.map((record, index) => <button key={record.id} onClick={() => setRecordView(record.id)} className="relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black hover:border-[#9D8BC8]/70 transition-colors"><Image src={record.src} alt={`${patient.name} ${record.label}`} fill className="object-contain" />{index === 0 && overlayFor(true)}<span className="absolute bottom-3 left-3 right-3 bg-black/70 rounded-lg p-2 text-left text-[10px]"><b className="block text-white">{record.label}</b><span className="text-neutral-400">{record.date}</span></span></button>)}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center overflow-hidden">{mriStudy(activeRecord.src, `${patient.name} ${activeRecord.label}`, recordView === "current")}</div>
            )}
            <div className="absolute top-4 left-4 text-[10px] tracking-[.15em] text-neutral-300 bg-black/65 px-3 py-2 rounded-lg"><span className="block text-white">{recordView === "all" ? "ALL MRI RECORDS" : activeRecord.label.toUpperCase()}</span><span className="text-neutral-500 tracking-normal">{recordView === "all" ? `${records.length} studies` : activeRecord.date}</span></div>
            <div className="absolute bottom-4 left-4 text-[10px] text-neutral-500 font-mono">ZOOM {Math.round(zoom * 100)}% · X 248 Y 316 · {activeTool.toUpperCase()}</div>
            <div className="absolute bottom-4 right-4 flex gap-1"><IconButton label="Zoom out" onClick={() => setZoom(v => Math.max(.6, v - .1))}><ZoomOut size={16} /></IconButton><IconButton label="Zoom in" onClick={() => setZoom(v => Math.min(2.4, v + .1))}><ZoomIn size={16} /></IconButton><IconButton label={panelOpen ? "Close AI panel" : "Open AI panel"} onClick={() => setPanelOpen(v => !v)}>{panelOpen ? <PanelRightClose size={16} /> : <PanelRightOpen size={16} />}</IconButton></div>
          </div>

          <div className="bg-[#141416] border-t border-white/[0.08]">
            <div className="px-4 py-2 flex items-center gap-2 overflow-x-auto border-b border-white/[0.06]">
              <span className="text-[10px] uppercase tracking-[.14em] text-neutral-500 mr-2">Layers</span>
              {LABELS.map(label => <button key={label.id} onClick={() => setSelectedLabel(label.id)} className={`h-8 px-3 rounded-lg flex items-center gap-2 text-xs border ${selectedLabel === label.id ? "border-white/25 bg-white/10" : "border-transparent text-neutral-400"}`}><span className="w-2.5 h-2.5 rounded-full" style={{ background: label.color }} />{label.name}<span onClick={e => { e.stopPropagation(); setVisible(v => ({ ...v, [label.id]: !v[label.id] })); }}>{visible[label.id] ? <Eye size={13} /> : <EyeOff size={13} />}</span><span onClick={e => { e.stopPropagation(); setLocked(v => ({ ...v, [label.id]: !v[label.id] })); }}>{locked[label.id] ? <Lock size={12} /> : <LockOpen size={12} />}</span></button>)}
            </div>
            <div className="h-14 px-5 flex items-center gap-4"><button onClick={() => setCurrentSlice(Math.max(1, currentSlice - 1))} disabled={currentSlice === 1} aria-label="Previous slice"><ChevronLeft size={19} /></button><span className="text-[10px] uppercase tracking-[.14em] text-neutral-500">Slice / boundary</span><input aria-label="MRI slice and lesion boundary" type="range" min={1} max={images.length} step={1} value={currentSlice} onChange={e => setCurrentSlice(Math.max(1, Math.min(images.length, Number(e.target.value))))} className="flex-1 accent-[#9D8BC8]" /><button onClick={() => setCurrentSlice(Math.min(images.length, currentSlice + 1))} disabled={currentSlice === images.length} aria-label="Next slice"><ChevronRight size={19} /></button><span className="w-16 text-right text-xs font-mono text-neutral-400">{currentSlice} / {images.length}</span></div>
          </div>
        </main>

        {panelOpen && <aside className="hidden xl:block bg-[rgba(24,24,26,.96)] border-l border-white/[0.08] p-5 overflow-y-auto max-h-[774px]">
          <div className="flex items-center justify-between mb-6"><div><p className="text-[11px] uppercase tracking-[.16em] text-[#9D8BC8]">AI Result</p><h2 className="text-lg font-semibold mt-1">{patient.name}</h2><p className="text-[10px] text-neutral-500 mt-1">Longitudinal analysis</p></div><IconButton label="Close panel" onClick={() => setPanelOpen(false)}><PanelRightClose size={17} /></IconButton></div>
          <section className="mb-6">
            <div className="flex items-center justify-between mb-3"><h3 className="text-xs font-semibold">Previous MRI records</h3><button onClick={() => setRecordView("all")} className={`px-3 py-1.5 rounded-lg text-[10px] font-semibold ${recordView === "all" ? "bg-[#9D8BC8] text-white" : "bg-white/[.06] text-neutral-300"}`}>ALL</button></div>
            <div className="space-y-2">{records.map(record => <button key={record.id} onClick={() => setRecordView(record.id)} className={`w-full p-2 rounded-xl border flex items-center gap-3 text-left ${recordView === record.id ? "border-[#9D8BC8]/60 bg-white/[.07]" : "border-white/[.07] hover:bg-white/[.04]"}`}><span className="relative w-12 h-12 rounded-lg overflow-hidden bg-black shrink-0"><Image src={record.src} alt="" fill className="object-cover" /></span><span><b className="block text-[11px] text-neutral-200">{record.label}</b><span className="text-[10px] text-neutral-500">{record.date}</span></span></button>)}</div>
          </section>
          <div className="grid grid-cols-2 gap-3 mb-3"><div className="p-3 rounded-xl bg-white/[.04]"><p className="text-[10px] text-neutral-500">Baseline MRI</p><p className="text-sm mt-1">{patient.baselineDate}</p></div><div className="p-3 rounded-xl bg-white/[.04]"><p className="text-[10px] text-neutral-500">Current MRI</p><p className="text-sm mt-1">{patient.currentDate}</p></div></div>
          <div className="p-3 rounded-xl bg-white/[.04] mb-6 flex items-center justify-between"><div><p className="text-[10px] text-neutral-500">Penumbra volume change</p><p className="text-sm mt-1">{patient.status}</p></div><span className={`text-lg font-mono ${patient.status.startsWith("Increasing") ? "text-amber-400" : patient.status === "Reducing" ? "text-emerald-400" : "text-neutral-300"}`}>{patient.trend}</span></div>
          <section className="mb-6"><div className="flex items-center gap-2 mb-3"><Activity size={15} className="text-[#9D8BC8]" /><h3 className="text-xs font-semibold">Stroke subtype likelihood</h3></div><div className="rounded-xl border border-white/[.08] overflow-hidden text-[11px]"><div className="grid grid-cols-[1fr_52px_52px] bg-white/[.05] text-neutral-500"><span className="p-2">Subtype</span><span className="p-2">Pass A</span><span className="p-2">Pass B</span></div>{[["LAA · Large-artery", ".38", ".04"], ["SVO · Small-vessel", ".53", ".05"], ["CE · Cardioembolic", ".05", ".90"]].map(row => <div key={row[0]} className="grid grid-cols-[1fr_52px_52px] border-t border-white/[.06]"><span className="p-2 text-neutral-300">{row[0]}</span><span className="p-2 font-mono">{row[1]}</span><span className="p-2 font-mono">{row[2]}</span></div>)}</div></section>
          <section className="space-y-4"><h3 className="text-xs font-semibold flex items-center gap-2"><ScanLine size={15} className="text-[#9D8BC8]" />Report details</h3><div><p className="text-[10px] text-neutral-500">Ischemic stroke subtype</p><p className="text-sm mt-1">SVO — Small vessel occlusion</p></div><div><p className="text-[10px] text-neutral-500">Risk factors</p><p className="text-sm mt-1 text-neutral-300">Hypertension, diabetes, cardioembolic heart disease</p></div><div><p className="text-[10px] text-neutral-500">Angiography</p><p className="text-sm mt-1 text-neutral-500">Not yet available</p></div><label className="block"><span className="text-[10px] text-neutral-500">Memo</span><textarea value={memo} onChange={e => setMemo(e.target.value)} className="mt-2 w-full min-h-24 resize-none rounded-xl bg-black/30 border border-white/10 p-3 text-xs text-neutral-300 outline-none focus:border-[#9D8BC8]" /></label></section>
          <p className="mt-7 pt-5 border-t border-white/[.08] text-[10px] leading-relaxed text-neutral-500">Research and decision-support prototype. Results require qualified professional review and are not a clinical diagnosis.</p>
        </aside>}
      </div>
    </div>
  );
}
