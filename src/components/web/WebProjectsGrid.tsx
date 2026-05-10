"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WebProjectsGrid({ projects }: { projects: any[] }) {
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-7xl mx-auto">
      <div className="folder-panel">
        <div className="folder-panel-tab">PROJECTS</div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
          <AnimatePresence mode="popLayout">
            {projects.map((project, index) => {
              const isExpanded = expandedCardId === project.id;
              // determine thumbnail
              const displayImage = project.thumbnail || (project.images && project.images.length > 0 ? project.images[0] : null);

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  key={project.id}
                  className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,187,0,0.08)] transition-all flex flex-col group"
                >
                  {/* Thumbnail / Image Area */}
                  <div className="w-full aspect-video bg-[#111] relative overflow-hidden flex items-center justify-center">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt={project.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                          const parent = (e.target as HTMLImageElement).parentElement;
                          if (parent && !parent.querySelector('.no-preview-text')) {
                            const fallback = document.createElement('div');
                            fallback.className = 'no-preview-text text-gray-600 font-outfit text-sm w-full h-full flex items-center justify-center bg-[#111] absolute inset-0';
                            fallback.innerText = 'No Preview';
                            parent.insertBefore(fallback, parent.firstChild);
                          }
                        }}
                      />
                    ) : (
                      <div className="text-gray-600 font-outfit text-sm">
                        No Preview
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-outfit font-bold mb-3 group-hover:text-brand-yellow transition-colors">
                      {project.name}
                    </h3>
                    
                    {/* Tech Stack Bubbles */}
                    {project.techStack && project.techStack.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.techStack.map((tech: string, i: number) => (
                          <span
                            key={i}
                            className="text-[10px] font-bold tracking-wider bg-brand-yellow/10 text-brand-yellow px-2.5 py-1 rounded-full border border-brand-yellow/20 uppercase"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.description && (
                      <p className="text-sm text-[var(--theme-text)] opacity-80 mb-5 line-clamp-3">
                        {project.description}
                      </p>
                    )}

                    <div className="mt-auto pt-4 flex gap-4 border-t border-[var(--theme-border)]">
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold hover:text-brand-yellow transition-colors"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                          </svg>
                          Code
                        </a>
                      )}
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-2 text-sm font-semibold hover:text-brand-yellow transition-colors"
                        >
                          <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          Live
                        </a>
                      )}
                    </div>
                    
                    {/* Images Gallery Expansion if multiple images */}
                    {project.images && project.images.length > 1 && (
                      <div className="mt-4 pt-3 border-t border-[var(--theme-border)] border-dashed">
                        <button
                          onClick={() => setExpandedCardId(isExpanded ? null : project.id)}
                          className="text-[11px] text-[#ffbb00] uppercase tracking-wider font-bold hover:underline"
                        >
                          {isExpanded ? "▲ Hide Gallery" : `▼ View Gallery (${project.images.length})`}
                        </button>
                        
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-2 gap-2 mt-3">
                                {project.images.map((img: string, idx: number) => (
                                  <a href={img} target="_blank" rel="noreferrer" key={idx}>
                                    <div className="aspect-video bg-[#111] rounded overflow-hidden">
                                      <img src={img} className="w-full h-full object-cover hover:scale-110 transition-transform" />
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {projects.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40 font-outfit text-xl">
              No projects found. Check back later!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
