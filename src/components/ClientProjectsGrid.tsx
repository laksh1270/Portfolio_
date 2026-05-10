"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function getEmbedUrl(url: string) {
  if (!url) return null;
  if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : new URLSearchParams(new URL(url).search).get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  }
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = url.split("/file/d/")[1]?.split("/")[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  if (url.includes("instagram.com/reel/") || url.includes("instagram.com/p/")) {
    return url.replace(/\/?$/, "") + "/embed";
  }
  return url;
}

function getDriveThumbnail(url: string) {
  if (!url) return null;
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = url.split("/file/d/")[1]?.split("/")[0];
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w640`;
  }
  if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : new URLSearchParams(new URL(url).search).get("v");
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
  return null;
}

function getClientAvatar(link: string, avatar?: string) {
  if (avatar && avatar.trim() !== "" && avatar !== "null") return avatar;
  if (!link) return null;
  try {
    const url = new URL(link);
    return `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`;
  } catch {
    return null;
  }
}

function getClientPlatform(link: string): string {
  if (!link) return "";
  if (link.includes("youtube.com") || link.includes("youtu.be")) return "YouTube";
  if (link.includes("instagram.com")) return "Instagram";
  if (link.includes("twitter.com") || link.includes("x.com")) return "X";
  return "Website";
}

function getPlatformFromLink(link: string): string {
  if (!link) return "";
  if (link.includes("drive.google.com")) return "Google Drive";
  if (link.includes("youtube.com") || link.includes("youtu.be")) return "YouTube";
  if (link.includes("instagram.com")) return "Instagram";
  return "Link";
}

export default function ClientProjectsGrid({ projects, folders }: { projects: any[]; folders: any[] }) {
  const [activeFormat, setActiveFormat] = useState<string>("ALL");
  const [activeFolderId, setActiveFolderId] = useState<string | "ALL">("ALL");
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  let filteredProjects = projects;
  if (activeFormat !== "ALL") {
    filteredProjects = filteredProjects.filter((p) => p.contentType === activeFormat);
  }
  if (activeFolderId === "ALL") {
    filteredProjects = filteredProjects.filter((p) => p.showInMain !== false);
  } else {
    filteredProjects = filteredProjects.filter((p) =>
      p.folders.some((f: any) => f.id === activeFolderId)
    );
  }

  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-7xl mx-auto">
      {/* ─── Video Modal ─── */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setActiveVideoUrl(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-5xl h-[80vh] bg-black rounded-2xl overflow-hidden shadow-2xl border border-[#333]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveVideoUrl(null)}
                className="absolute top-4 right-4 z-[110] bg-[#ffbb00] text-black w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl hover:bg-[#ffd24d] transition"
              >
                ✕
              </button>
              <iframe
                src={getEmbedUrl(activeVideoUrl) || ""}
                className="w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="folder-panel">
        <div className="folder-panel-tab left-10 right-auto">PORTFOLIO</div>

        {/* ─── Format Tabs ─── */}
        <div className="flex gap-3 mb-8 justify-center pb-8 border-b border-[var(--theme-border)] flex-wrap">
          {["ALL", "Short Form", "Long Form"].map((format) => (
            <button
              key={format}
              onClick={() => setActiveFormat(format)}
              className={`px-6 md:px-8 py-2.5 rounded-full text-sm md:text-base font-outfit uppercase tracking-widest transition-all ${
                activeFormat === format
                  ? "bg-[#ffbb00] text-black shadow-lg font-bold"
                  : "bg-transparent border border-[var(--theme-border)] hover:border-[#ffbb00] hover:text-[#ffbb00]"
              }`}
            >
              {format === "ALL" ? "All Formats" : format}
            </button>
          ))}
        </div>

        {/* ─── Folder Tabs (always visible) ─── */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          <button
            onClick={() => setActiveFolderId("ALL")}
            className={`px-5 py-2 rounded-full border text-sm transition-all flex items-center gap-2 ${
              activeFolderId === "ALL"
                ? "border-[#ffbb00] text-[#ffbb00] font-semibold bg-[#ffbb00]/10"
                : "border-[var(--theme-border)] opacity-60 hover:opacity-100 hover:border-[#ffbb00]"
            }`}
          >
            <span>📂</span> All Projects
          </button>
          {folders.map((folder) => {
            const count = projects.filter((p) =>
              p.folders.some((f: any) => f.id === folder.id)
            ).length;
            return (
              <button
                key={folder.id}
                onClick={() => setActiveFolderId(folder.id)}
                className={`px-5 py-2 rounded-full border text-sm transition-all flex items-center gap-2 ${
                  activeFolderId === folder.id
                    ? "border-[#ffbb00] text-[#ffbb00] font-semibold bg-[#ffbb00]/10"
                    : "border-[var(--theme-border)] opacity-60 hover:opacity-100 hover:border-[#ffbb00]"
                }`}
              >
                <span>📁</span> {folder.name}
                <span className="text-[10px] opacity-50">({count})</span>
              </button>
            );
          })}
        </div>

        {/* ─── Project Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              const hasExplicitThumb = project.thumbnail && project.thumbnail.trim() !== "" && project.thumbnail !== "null";
              const thumb =
                (hasExplicitThumb ? project.thumbnail : null) ||
                getDriveThumbnail(project.platformLink || "") ||
                null;
              const isExpanded = expandedCardId === project.id;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  key={project.id}
                  className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:shadow-[0_0_25px_rgba(255,187,0,0.08)] transition-all group"
                >
                  {/* Thumbnail */}
                  <div
                    className="w-full aspect-video bg-[#111] relative overflow-hidden flex items-center justify-center cursor-pointer"
                    onClick={() =>
                      project.platformLink &&
                      setActiveVideoUrl(project.platformLink)
                    }
                  >
                    {thumb ? (
                      <div className="w-full h-full relative">
                        {/* Blurred background for Short Form/Vertical content */}
                        {project.contentType === "Short Form" && (
                          <img
                            src={thumb}
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110"
                          />
                        )}
                        
                        <img
                          src={thumb}
                          alt={project.title}
                          referrerPolicy="no-referrer"
                          className={`relative z-10 w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                            project.contentType === "Short Form" ? "object-contain" : "object-cover"
                          }`}
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
                      </div>
                    ) : (
                      <div className="text-gray-600 font-outfit text-sm">
                        No Preview
                      </div>
                    )}

                    {/* Play overlay */}
                    {project.platformLink && (
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-[#ffbb00]/90 text-black flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform shadow-lg pl-0.5">
                          <svg
                            className="w-7 h-7"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {project.contentType && (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-black/70 text-white px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {project.contentType}
                        </span>
                      )}
                      {project.platformLink && (
                        <span className="text-[10px] uppercase font-bold tracking-wider bg-[#ffbb00]/80 text-black px-2.5 py-1 rounded-full backdrop-blur-sm">
                          {getPlatformFromLink(project.platformLink)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-outfit font-semibold mb-2">
                      {project.title}
                    </h3>

                    {/* Reach Stats */}
                    {(project.views || project.likes) && (
                      <div className="flex gap-4 mb-4 items-center">
                        {project.views && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] opacity-60">👁️</span>
                            <span className="text-xs font-bold text-[var(--theme-text)] font-outfit">{project.views}</span>
                          </div>
                        )}
                        {project.likes && (
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] opacity-60">❤️</span>
                            <span className="text-xs font-bold text-[var(--theme-text)] font-outfit">{project.likes}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Client Info */}
                    {project.clientName && (
                      <div
                        className={`flex items-center gap-2.5 mb-3 ${
                          project.clientLink
                            ? "cursor-pointer hover:opacity-80"
                            : ""
                        }`}
                        onClick={(e) => {
                          if (project.clientLink) {
                            e.stopPropagation();
                            window.open(project.clientLink, "_blank");
                          }
                        }}
                      >
                        <div className="w-8 h-8 rounded-full bg-[#222] border border-[#444] flex items-center justify-center overflow-hidden shrink-0">
                          {project.clientLink ? (
                            <img
                              src={
                                getClientAvatar(project.clientLink, project.clientAvatar) || ""
                              }
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display =
                                  "none";
                              }}
                            />
                          ) : (
                            <span className="text-xs text-gray-500">👤</span>
                          )}
                        </div>
                        <div>
                          <span className="text-sm text-[#ffbb00] font-medium">
                            {project.clientName}
                          </span>
                          {project.clientLink && (
                            <span className="text-[10px] text-gray-500 ml-2 uppercase">
                              {getClientPlatform(project.clientLink)} ↗
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Software Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tags.map((t: any) => (
                          <span
                            key={t.id}
                            className="text-[10px] uppercase font-bold tracking-wider bg-purple-500/15 text-[var(--theme-text)] px-2 py-0.5 rounded-md border border-purple-500/20"
                          >
                            {t.name}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Description Preview */}
                    {project.description && (
                      <p className="text-xs text-[var(--theme-text)] opacity-80 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                    )}

                    {/* Expandable Details */}
                    {project.metadataOptions && project.metadataOptions.length > 0 && (
                      <>
                        <button
                          onClick={() =>
                            setExpandedCardId(
                              isExpanded ? null : project.id
                            )
                          }
                          className="text-[11px] text-[#ffbb00] uppercase tracking-wider font-bold hover:underline mb-2"
                        >
                          {isExpanded ? "▲ Hide Details" : "▼ More Details"}
                        </button>

                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 pt-3 border-t border-[var(--theme-border)]">
                                {["LANGUAGE", "SUBJECT_MATTER", "VISUAL_STYLE", "NARRATIVE_FORM", "EDITING_STYLE"].map(type => {
                                  const options = project.metadataOptions.filter((o: any) => o.type === type);
                                  if (options.length === 0) return null;
                                  
                                  const labelMap: Record<string, string> = {
                                    "LANGUAGE": "Language",
                                    "SUBJECT_MATTER": "Subject",
                                    "VISUAL_STYLE": "Visual Style",
                                    "NARRATIVE_FORM": "Narrative",
                                    "EDITING_STYLE": "Editing Style"
                                  };

                                  return (
                                    <DetailItem
                                      key={type}
                                      label={labelMap[type]}
                                      value={options.map((o: any) => o.name).join(", ")}
                                    />
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredProjects.length === 0 && (
            <div className="col-span-full py-20 text-center opacity-40 font-outfit text-xl">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">
        {label}
      </span>
      <span className="text-xs text-[var(--theme-text)] font-medium">{value}</span>
    </div>
  );
}
