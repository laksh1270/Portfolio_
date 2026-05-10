"use client";

import { motion } from "framer-motion";

const exps = [
  { date: "JULY 2020", title: "Graphic Designing & Video Editing intern in TYS (The Yellow Screens) Digital." },
  { date: "JANUARY 2021", title: "Completed 5 Months Internship in TYS (The Yellow Screens) Digital." },
  { date: "FEBRUARY 2021", title: "Started Freelance Video Editing, Graphic Designing & Branding." },
  { date: "FEBRUARY 2022", title: "Started working for The Boho Sapiens (400K on YT) as a Brand Designer, Video Editor & Graphic Designer." },
];

export default function ExperienceSection() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab right-10">EXPERIENCE</div>
        <div className="py-10 px-4 md:px-10 relative">
          <div className="absolute left-[38px] md:left-[58px] top-14 bottom-14 w-[1px] bg-brand-yellow"></div>
          
          <div className="space-y-12">
            {exps.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex items-start gap-8 relative z-10"
              >
                <div className="w-10 h-10 rounded-full bg-brand-surface border border-brand-yellow flex items-center justify-center shrink-0 text-brand-yellow text-sm">
                  ↗
                </div>
                <div>
                  <h3 className="text-3xl font-outfit uppercase tracking-widest mb-4">{exp.date}</h3>
                  <p className="text-xl font-inter opacity-70 leading-relaxed">{exp.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
