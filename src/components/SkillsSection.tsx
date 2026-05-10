"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Pr", percent: 100, color: "#00005c", label: "Premiere Pro" },
  { name: "CapCut", percent: 100, color: "#000000", label: "CapCut" },
  { name: "Ai", percent: 100, color: "#330000", label: "Illustrator" },
  { name: "Ae", percent: 70, color: "#00005c", label: "After Effects" },
  { name: "Canva", percent: 100, color: "#00c4cc", label: "Canva" },
  { name: "VN", percent: 100, color: "#1a1a2e", label: "VN Video Editor" },
];

export default function SkillsSection() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab">Software Skills</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-20 gap-x-10 py-12">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-40 h-24 flex items-end justify-center">
                <svg viewBox="0 0 100 50" className="absolute top-0 left-0 w-full h-full overflow-visible">
                  {/* Background Arc */}
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#333"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Foreground Animated Arc */}
                  <motion.path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#ffbb00"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: skill.percent / 100 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />
                </svg>
                {/* Center Badge */}
                <div 
                  className="w-24 h-12 rounded-t-[3rem] rounded-b-xl flex items-center justify-center translate-y-2 shadow-md relative z-10"
                  style={{ backgroundColor: skill.color }}
                >
                  <span className="text-white font-outfit text-lg font-semibold">{skill.name}</span>
                </div>
              </div>
              <div className="mt-8 text-3xl font-bold font-inter">{skill.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
