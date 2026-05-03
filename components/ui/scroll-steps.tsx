"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll } from "framer-motion";
import Image, { StaticImageData } from "next/image";

export interface Step {
  label: string;
  headline: string;
  bullets: string[];
  visual: string | StaticImageData;
  accent?: string;
}

interface Props {
  steps: Step[];
}

export default function ScrollSteps({ steps }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const N = steps.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setProgress(v);
      setActive(Math.min(Math.floor(v * N), N - 1));
    });
  }, [scrollYProgress, N]);

  const accent = steps[active]?.accent ?? "#6366f1";

  return (
    <div
      ref={containerRef}
      style={{ height: `${N * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen bg-[#030712] flex flex-col px-8 lg:px-20 pt-10 pb-12 overflow-hidden">

        {/* ── Progress tracker ── */}
        <div className="mb-10 max-w-lg">
          <div className="relative flex items-center justify-between">
            {/* Background track */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/10" />

            {/* Fill track */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-px transition-all duration-150 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: accent,
              }}
            />

            {/* Dots */}
            {steps.map((step, i) => {
              const isActive = i <= active;
              return (
                <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all duration-300"
                    style={
                      isActive
                        ? { background: accent, borderColor: accent, color: "#fff" }
                        : { background: "#0f172a", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.2)" }
                    }
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <span
                    className="text-[10px] font-semibold tracking-widest uppercase transition-all duration-300 whitespace-nowrap"
                    style={{ color: isActive ? accent : "rgba(255,255,255,0.2)" }}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="flex flex-1 gap-12 overflow-hidden">

          {/* Left 45% — text */}
          <div className="relative w-[45%] flex items-center">
            {steps.map((step, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col justify-center"
                style={{
                  opacity: i === active ? 1 : 0,
                  transform: i === active ? "translateY(0px)" : "translateY(18px)",
                  transition: "opacity 300ms ease, transform 300ms ease",
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                <span
                  className="text-xs font-bold tracking-[0.18em] uppercase mb-5 block"
                  style={{ color: step.accent ?? "#818cf8" }}
                >
                  {step.label}
                </span>
                <h2 className="text-4xl xl:text-5xl font-black text-white leading-[1.1] mb-7 tracking-tight">
                  {step.headline}
                </h2>
                <ul className="space-y-3.5">
                  {step.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <span
                        className="mt-[7px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: step.accent ?? "#818cf8" }}
                      />
                      <span className="text-slate-400 text-sm leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right 55% — visual */}
          <div className="relative w-[55%]">
            {steps.map((step, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 500ms ease",
                  pointerEvents: i === active ? "auto" : "none",
                }}
              >
                {/* Glow halo */}
                <div
                  className="absolute w-72 h-72 rounded-full blur-[80px] opacity-20 transition-colors duration-500"
                  style={{ background: step.accent ?? "#6366f1" }}
                />

                {/* Image frame */}
                <div
                  className="relative z-10 w-64 h-64 lg:w-80 lg:h-80 rounded-2xl border flex items-center justify-center p-8"
                  style={{
                    borderColor: `${step.accent ?? "#6366f1"}30`,
                    background: `${step.accent ?? "#6366f1"}08`,
                  }}
                >
                  <Image
                    src={step.visual}
                    alt={step.headline}
                    fill
                    className="object-contain p-10 invert opacity-90"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
