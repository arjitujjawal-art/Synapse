"use client";

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface Props {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  duration?: number;
}

export default function AnimatedNumber({
  value,
  suffix = "",
  prefix = "",
  decimals = 0,
  className = "",
  duration = 1.5,
}: Props) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) =>
    decimals > 0 ? latest.toFixed(decimals) : Math.round(latest).toString()
  );

  useEffect(() => {
    const controls = animate(count, value, {
      duration,
      ease: [0.25, 0.4, 0.25, 1],
    });
    return controls.stop;
  }, [count, value, duration]);

  return (
    <span className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}
