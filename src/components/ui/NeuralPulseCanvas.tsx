"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import {
  generateNeuralNetwork,
  NeuralNetwork,
} from "@/lib/neuralNetwork";

interface Props {
  intensity?: "ambient" | "active" | "processing";
  className?: string;
}

export default function NeuralPulseCanvas({
  intensity = "ambient",
  className = "",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const networkRef = useRef<NeuralNetwork | null>(null);
  const animationRef = useRef<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Pulse state
  const pulsesRef = useRef<
    {
      pathIndex: number;
      edgeIndex: number;
      progress: number;
      speed: number;
    }[]
  >([]);

  const lastPulseTimeRef = useRef(0);

  const getInterval = useCallback(() => {
    switch (intensity) {
      case "processing":
        return 1200;
      case "active":
        return 2500;
      default:
        return 4500;
    }
  }, [intensity]);

  const getOpacity = useCallback(() => {
    switch (intensity) {
      case "processing":
        return 0.18;
      case "active":
        return 0.1;
      default:
        return 0.06;
    }
  }, [intensity]);

  const draw = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const network = networkRef.current;
      if (!network) return;

      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);

      const baseOpacity = getOpacity();

      // Draw edges
      ctx.strokeStyle = `rgba(150, 150, 150, ${baseOpacity * 0.5})`;
      ctx.lineWidth = 0.8;
      for (const edge of network.edges) {
        const from = network.nodes[edge.from];
        const to = network.nodes[edge.to];
        ctx.beginPath();
        // Curved edges for organic feel
        const mx = (from.x + to.x) / 2 + (Math.random() - 0.5) * 0;
        const my = (from.y + to.y) / 2 + (Math.random() - 0.5) * 0;
        ctx.moveTo(from.x, from.y);
        ctx.quadraticCurveTo(mx, my, to.x, to.y);
        ctx.stroke();
      }

      // Draw nodes
      for (const node of network.nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 150, 150, ${baseOpacity * 0.7})`;
        ctx.fill();
      }

      // Spawn new pulses
      if (time - lastPulseTimeRef.current > getInterval()) {
        lastPulseTimeRef.current = time;
        const pathIdx = Math.floor(Math.random() * network.paths.length);
        if (network.paths[pathIdx] && network.paths[pathIdx].edges.length > 0) {
          pulsesRef.current.push({
            pathIndex: pathIdx,
            edgeIndex: 0,
            progress: 0,
            speed: intensity === "processing" ? 0.0018 : 0.0012,
          });
        }
      }

      // Animate pulses
      const activePulses = pulsesRef.current.filter((p) => {
        const path = network.paths[p.pathIndex];
        return path && p.edgeIndex < path.edges.length;
      });
      pulsesRef.current = activePulses;

      for (const pulse of activePulses) {
        const path = network.paths[pulse.pathIndex];
        const edgeIdx = path.edges[pulse.edgeIndex];
        const edge = network.edges[edgeIdx];
        if (!edge) continue;

        const from = network.nodes[edge.from];
        const to = network.nodes[edge.to];

        // Organic easing
        const t = pulse.progress;
        const easedT = t * t * (3 - 2 * t); // smoothstep

        const px = from.x + (to.x - from.x) * easedT;
        const py = from.y + (to.y - from.y) * easedT;

        // Magenta glow
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, 20);
        gradient.addColorStop(0, "rgba(232, 21, 139, 0.6)");
        gradient.addColorStop(0.5, "rgba(232, 21, 139, 0.15)");
        gradient.addColorStop(1, "rgba(232, 21, 139, 0)");
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Bright center point
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(232, 21, 139, 0.9)";
        ctx.fill();

        // Node glow when pulse passes
        const activeNode =
          pulse.progress < 0.2 ? edge.from : pulse.progress > 0.8 ? edge.to : -1;
        if (activeNode >= 0) {
          const node = network.nodes[activeNode];
          const glowScale = 1.15;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * glowScale + 4, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(232, 21, 139, 0.2)";
          ctx.fill();
        }

        // Advance
        pulse.progress += pulse.speed * 16;
        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.edgeIndex++;
        }
      }

      animationRef.current = requestAnimationFrame(draw);
    },
    [getInterval, getOpacity, intensity]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.scale(dpr, dpr);
      // Regenerate network on resize
      networkRef.current = generateNeuralNetwork(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    animationRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw, reducedMotion]);

  if (reducedMotion) {
    return null; // Static fallback — no animation
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
