"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function WebHeroSection() {
  const [isFlipped, setIsFlipped] = useState(false);
  return (
    <section
      className="flex items-stretch justify-center"
      style={{ background: "var(--theme-bg)", padding: "20px", minHeight: "92vh" }}
    >
      {/* Card */}
      <div
        className="w-full max-w-6xl relative overflow-hidden flex flex-col md:flex-row"
        style={{
          background: "var(--theme-bg)",
          border: "6px solid #ffbb00",
          borderRadius: "2.5rem",
          flex: 1,
        }}
      >

        {/* ======= LEFT COLUMN ======= */}
        <div className="flex-1 flex flex-col justify-between p-8 md:p-12 relative min-h-[420px]">

          {/* Hi! + Name */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="z-10"
          >
            <span
              className="inline-block px-4 py-1.5 text-sm font-outfit font-semibold mb-4"
              style={{
                border: "2px solid var(--theme-text)",
                color: "var(--theme-text)",
                borderRadius: "1rem 1rem 1rem 0.2rem",
                display: "inline-block",
                transform: "rotate(-6deg)",
              }}
            >
              Hi!
            </span>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-outfit font-semibold leading-none tracking-tight"
              style={{ color: "var(--theme-text)" }}
            >
              I&apos;m Laksh
            </h1>
          </motion.div>

          {/* ======= MOBILE ONLY: Logo right below Title ======= */}
          <div className="flex md:hidden w-full items-center justify-end pr-4 py-4 z-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-full overflow-hidden"
              style={{
                width: "160px",
                height: "160px",
                border: "4px solid #ffbb00",
                background: "white",
              }}
            >
              <div 
                className="w-full h-full relative cursor-pointer" 
                style={{ perspective: "1000px" }}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  className="w-full h-full"
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                    <img src="/laksh-logo.png" alt="Laksh" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                    <img src="/laksh-avatar.png" alt="Laksh Avatar" className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Pills */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="z-20 flex flex-col items-start gap-2.5 mb-8"
            style={{ marginLeft: "160px" }}
          >
            {/* Pill 1 – solid yellow fill */}
            <div
              className="pill-tag px-6 py-2 md:px-8 md:py-2.5 rounded-full text-sm md:text-base font-outfit font-bold tracking-widest w-max"
              style={{
                background: "#ffbb00",
                border: "2px solid #222",
                color: "#121212",
                transform: "rotate(-3deg)",
              }}
            >
              FULL-STACK DEVELOPER
            </div>
            {/* Pill 2 – pale yellow fill */}
            <div
              className="pill-tag px-6 py-2 md:px-8 md:py-2.5 rounded-full text-sm md:text-base font-outfit font-bold tracking-widest w-max"
              style={{
                background: "#fff3b0",
                border: "2px solid #222",
                color: "#121212",
                transform: "rotate(2deg) translateX(1.5rem)",
              }}
            >
              UI & UX DESIGN
            </div>
            {/* Pill 3 – pale yellow fill */}
            <div
              className="pill-tag px-6 py-2 md:px-8 md:py-2.5 rounded-full text-sm md:text-base font-outfit font-bold tracking-widest w-max"
              style={{
                background: "#fff3b0",
                border: "2px solid #222",
                color: "#121212",
                transform: "rotate(-1deg) translateX(0.8rem)",
              }}
            >
              FRONT-END DEVELOPER
            </div>
          </motion.div>

        </div>

        {/* ======= RIGHT COLUMN – Profile (Desktop Only) ======= */}
        <div className="hidden md:flex items-center justify-center py-8 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-full overflow-hidden"
            style={{
              width: "clamp(180px, 25vw, 270px)",
              height: "clamp(180px, 25vw, 270px)",
              border: "5px solid #ffbb00",
              background: "white",
            }}
          >
            <div 
              className="w-full h-full relative cursor-pointer" 
              style={{ perspective: "1000px" }}
              onMouseEnter={() => setIsFlipped(true)}
              onMouseLeave={() => setIsFlipped(false)}
            >
              <motion.div
                className="w-full h-full"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden" }}>
                  <img src="/laksh-logo.png" alt="Laksh" className="w-full h-full object-cover" />
                </div>
                <div className="absolute w-full h-full" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                  <img src="/laksh-avatar.png" alt="Laksh Avatar" className="w-full h-full object-cover" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ======= ARCH ======= */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-0 left-0 pointer-events-none"
          style={{ width: "600px", height: "320px", zIndex: 10 }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "-80px",
              width: "480px",
              height: "240px",
              borderRadius: "240px 240px 0 0",
              borderTop: "22px solid #ffbb00",
              borderLeft: "22px solid #ffbb00",
              borderRight: "22px solid #ffbb00",
              borderBottom: "none",
              background: "transparent",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: "140px",
              width: "200px",
              height: "100px",
              borderRadius: "100px 100px 0 0",
              borderTop: "20px solid #ffbb00",
              borderLeft: "20px solid #ffbb00",
              borderRight: "20px solid #ffbb00",
              borderBottom: "none",
              background: "transparent",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
