"use client";

import { useState } from "react";
import { approveWebTestimonial, deleteWebTestimonial, reorderWebTestimonials } from "../actions";
import { Star, CheckCircle, Trash2, Clock, ExternalLink } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function WebTestimonialList({ testimonials }: { testimonials: any[] }) {
  const [items, setItems] = useState(testimonials);

  const pending = items.filter((t) => !t.approved);
  const approved = items.filter((t) => t.approved);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(approved);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems([...pending, ...newItems]);
    await reorderWebTestimonials(newItems.map((t) => t.id));
  };

  return (
    <div className="space-y-12">
      {/* PENDING TESTIMONIALS */}
      <div>
        <h2 className="text-2xl font-outfit font-bold text-white mb-6 flex items-center gap-2">
          <Clock className="text-[#ffbb00]" /> Pending Approval ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 text-center text-gray-500">
            No pending feedback right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pending.map((t) => (
              <div key={t.id} className="bg-[#1a1a1a] border border-[#ffbb00]/50 rounded-2xl p-6 shadow-[0_0_20px_rgba(255,187,0,0.1)] relative">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white">{t.name}</h3>
                    <p className="text-sm text-gray-400">{t.email || "No email provided"}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < t.rating ? "#ffbb00" : "transparent"} color={i < t.rating ? "#ffbb00" : "#444"} />
                    ))}
                  </div>
                </div>
                <div className="bg-[#111] rounded-lg px-3 py-2 mb-3 border border-[#2a2a2a]">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Project</p>
                  <p className="text-[#ffbb00] font-semibold">{t.projectName || "—"}</p>
                  {(t.liveLink || t.githubLink || t.figmaLink) && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {t.liveLink && <a href={t.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md hover:bg-emerald-500/20 transition-colors"><ExternalLink size={10} /> Live</a>}
                      {t.githubLink && <a href={t.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-1 rounded-md hover:bg-blue-500/20 transition-colors"><ExternalLink size={10} /> GitHub</a>}
                      {t.figmaLink && <a href={t.figmaLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-md hover:bg-purple-500/20 transition-colors"><ExternalLink size={10} /> Figma</a>}
                    </div>
                  )}
                </div>
                <p className="text-gray-300 italic mb-6">"{t.feedback}"</p>
                <div className="flex gap-3 mt-auto">
                  <form action={approveWebTestimonial} className="flex-1">
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" className="w-full bg-[#ffbb00]/20 hover:bg-[#ffbb00]/30 text-[#ffbb00] border border-[#ffbb00]/30 py-2 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
                      <CheckCircle size={18} /> Approve
                    </button>
                  </form>
                  <form action={deleteWebTestimonial} className="flex-1">
                    <input type="hidden" name="id" value={t.id} />
                    <button type="submit" onClick={(e) => { if (!confirm("Delete this feedback?")) e.preventDefault(); }} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-2 rounded-xl flex items-center justify-center gap-2 font-medium transition-colors">
                      <Trash2 size={18} /> Delete
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* APPROVED TESTIMONIALS (DRAGGABLE) */}
      <div>
        <h2 className="text-2xl font-outfit font-bold text-white mb-6 flex items-center gap-2">
          <CheckCircle className="text-green-500" /> Live on Web Portfolio ({approved.length})
        </h2>

        {approved.length === 0 ? (
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-8 text-center text-gray-500">
            No approved feedback yet.
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="approved-web-testimonials">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                  {approved.map((t, index) => (
                    <Draggable key={t.id} draggableId={t.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center"
                        >
                          <div {...provided.dragHandleProps} className="text-gray-500 hover:text-white cursor-grab p-2 shrink-0">
                            ☰
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-bold text-white text-lg">{t.name}</h3>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} size={14} fill={i < t.rating ? "#ffbb00" : "transparent"} color={i < t.rating ? "#ffbb00" : "#444"} />
                                ))}
                              </div>
                            </div>
                            {t.projectName && <p className="text-xs text-[#ffbb00] font-semibold mb-1">{t.projectName}</p>}
                            <p className="text-gray-400 text-sm line-clamp-2">"{t.feedback}"</p>
                            {(t.liveLink || t.githubLink || t.figmaLink) && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {t.liveLink && <a href={t.liveLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-emerald-400 hover:underline"><ExternalLink size={10} />Live</a>}
                                {t.githubLink && <a href={t.githubLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-blue-400 hover:underline"><ExternalLink size={10} />GitHub</a>}
                                {t.figmaLink && <a href={t.figmaLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[10px] text-purple-400 hover:underline"><ExternalLink size={10} />Figma</a>}
                              </div>
                            )}
                          </div>
                          <form action={deleteWebTestimonial} className="shrink-0">
                            <input type="hidden" name="id" value={t.id} />
                            <button type="submit" onClick={(e) => { if (!confirm("Remove from live portfolio?")) e.preventDefault(); }} className="text-red-400 hover:text-red-300 p-2 border border-red-400/20 rounded-lg hover:bg-red-400/10 transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </form>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
}
