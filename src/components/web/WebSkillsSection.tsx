"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Figma", percent: 100, color: "#f24e1e", label: "Figma" },
  { name: "React", percent: 100, color: "#61dafb", label: "React" },
  { name: "Next.js", percent: 100, color: "#000000", label: "Next.js" },
  { name: "Node", percent: 100, color: "#339933", label: "Node.js" },
  { name: "TS", percent: 100, color: "#3178c6", label: "TypeScript" },
  { name: "CSS", percent: 100, color: "#06b6d4", label: "Tailwind CSS" },
  { name: "Motion", percent: 100, color: "#e11d48", label: "Framer Motion" },
  { name: "SQL", percent: 100, color: "#336791", label: "PostgreSQL" },
  { name: "DB", percent: 100, color: "#4db33d", label: "Database" },
];

export default function WebSkillsSection() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab">Tech Stack</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-12 gap-x-8 py-12">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-28 h-16 md:w-32 md:h-20 flex items-end justify-center">
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
                  className="w-16 h-8 md:w-20 md:h-10 rounded-t-[3rem] rounded-b-xl flex items-center justify-center translate-y-2 shadow-md relative z-10"
                  style={{ backgroundColor: skill.color }}
                >
                  <span className="text-white font-outfit text-xs md:text-sm font-semibold">{skill.name}</span>
                </div>
              </div>
              <div className="mt-6 text-xl md:text-2xl font-bold font-inter">{skill.percent}%</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
