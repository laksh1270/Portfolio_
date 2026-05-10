"use client";

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { reorderWebProjects, deleteWebProject } from "./actions";
import WebProjectForm from "./WebProjectForm";

export default function AdminWebProjectList({ projects, existingTags = [] }: { projects: any[], existingTags?: string[] }) {
  const [items, setItems] = useState(projects);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    setItems(newItems);
    await reorderWebProjects(newItems.map((p) => p.id));
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="web-projects">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
              {items.map((project, index) => (
                <Draggable key={project.id} draggableId={project.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden shadow-sm flex flex-col"
                    >
                      <div className="flex flex-col md:flex-row p-4 gap-4 items-start md:items-center">
                        <div {...provided.dragHandleProps} className="text-gray-500 hover:text-white cursor-grab p-2 shrink-0">
                          ☰
                        </div>
                        
                        <div className="w-full md:w-32 aspect-video bg-[#111] shrink-0 overflow-hidden rounded flex items-center justify-center">
                          {project.thumbnail ? (
                            <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover" />
                          ) : project.images?.[0] ? (
                            <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-500">No Img</span>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-lg font-outfit text-white truncate">{project.name}</h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {project.techStack?.map((t: string) => (
                              <span key={t} className="text-[10px] bg-[#222] border border-[#333] px-2 py-0.5 rounded text-gray-400 uppercase tracking-wider">{t}</span>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 shrink-0 self-end md:self-center mt-4 md:mt-0">
                          <button
                            onClick={() => setEditingId(editingId === project.id ? null : project.id)}
                            className="bg-[#2a2a2a] hover:bg-[#3a3a3a] text-white px-4 py-2 rounded-lg text-sm transition-colors border border-[#333]"
                          >
                            {editingId === project.id ? "Cancel Edit" : "Edit"}
                          </button>
                          <form action={deleteWebProject}>
                            <input type="hidden" name="id" value={project.id} />
                            <button 
                              type="submit"
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm transition-colors"
                              onClick={(e) => {
                                if(!confirm("Are you sure you want to delete this web project?")) e.preventDefault();
                              }}
                            >
                              Delete
                            </button>
                          </form>
                        </div>
                      </div>

                      {editingId === project.id && (
                        <div className="p-6 border-t border-[#2a2a2a] bg-[#111]">
                          <WebProjectForm project={project} existingTags={existingTags} />
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      
      {items.length === 0 && (
        <div className="text-center py-10 bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] text-gray-500 font-outfit">
          No web projects yet. Add one above!
        </div>
      )}
    </div>
  );
}
