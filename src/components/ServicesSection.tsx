"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    { id: "01", title: "SMOOTH\nTRANSITIONS" },
    { id: "02", title: "MOTION\nGRAPHICS" },
    { id: "03", title: "STYLISH\nCAPTIONS" },
    { id: "04", title: "COLOR\nGRADING" },
    { id: "05", title: "SOUND\nDESIGN" },
  ];

  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-24 max-w-2xl"
      >
        <div className="folder-panel bg-brand-surface border-brand-border px-10 py-12 rounded-t-none border-t-0 shadow-sm relative pt-16">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-12 bg-brand-surface border-t border-l border-r border-brand-border rounded-t-2xl"></div>
          <h2 className="text-3xl md:text-5xl font-outfit uppercase tracking-wide font-medium leading-tight">
            Elevate<br/>
            <span className="text-brand-yellow">→</span> Your Content<br/>
            With Cinematic<br/>
            Video Editing!
          </h2>
        </div>
      </motion.div>

      <div className="w-full flex flex-col gap-16 md:gap-24">
        {services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col relative ${index % 2 === 0 ? "items-start text-left" : "items-end text-right"}`}
          >
            <span className="outline-number absolute top-[-50px] md:top-[-70px] z-0">{service.id}</span>
            <h3 className="text-2xl md:text-4xl text-brand-yellow font-outfit uppercase font-semibold leading-none whitespace-pre-line relative z-10 pt-4">
              {service.title}
            </h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
