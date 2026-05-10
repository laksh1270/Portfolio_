"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab">ABOUT ME</div>
        <div className="py-8 px-4 md:px-8 space-y-6">
          {[
            "Professional Video Editor crafting cinematic, scroll-stopping content.",
            "2+ Years of transforming raw footage into polished, stylish videos.",
            "Every frame edited with precision, purpose, and creative intent."
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
