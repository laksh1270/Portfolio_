"use client";

import { motion } from "framer-motion";

export default function WebAboutSection() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab">ABOUT ME</div>
        <div className="py-8 px-4 md:px-8 space-y-6">
          {[
            "Full-Stack Developer building modern, scalable web applications with clean architecture.",
            "Passionate about crafting seamless user experiences powered by robust backend systems.",
            "Every project engineered with performance, security, and maintainability in mind."
          ].map((text, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex items-start gap-4 text-xl md:text-2xl font-inter"
            >
              <span className="text-brand-yellow mt-1">↗</span>
              <p>{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
