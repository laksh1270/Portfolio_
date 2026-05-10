"use client";
import { useState, useEffect } from "react";
import ProjectForm from "./ProjectForm";
import { deleteProject, reorderProjects } from "./actions";
import { Reorder, useDragControls } from "framer-motion";
import { GripVertical, FolderIcon, Filter } from "lucide-react";

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

export default function AdminProjectList({ projects, folders, tags, metadataOptions }: { projects: any[]; folders: any[]; tags: any[]; metadataOptions: any[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeFolderId, setActiveFolderId] = useState<string>("ALL");
  const [orderedProjects, setOrderedProjects] = useState(projects);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Sync state when projects prop changes
  useEffect(() => {
    setOrderedProjects(projects);
  }, [projects]);

  const filteredProjects = activeFolderId === "ALL" 
    ? orderedProjects 
    : orderedProjects.filter(p => p.folders.some((f: any) => f.id === activeFolderId));

  const handleReorder = (newOrder: any[]) => {
    // If we are filtering, we need to merge the new order back into the full list
    if (activeFolderId !== "ALL") {
      const fullList = [...orderedProjects];
      // Find indices of currently filtered items in the full list
      const filteredIndices = orderedProjects
        .map((p, i) => p.folders.some((f: any) => f.id === activeFolderId) ? i : -1)
        .filter(i => i !== -1);
      
      // Update those indices with items from newOrder
      filteredIndices.forEach((index, i) => {
        fullList[index] = newOrder[i];
      });
      setOrderedProjects(fullList);
    } else {
      setOrderedProjects(newOrder);
    }
    setHasChanges(true);
  };

  const saveOrder = async () => {
    setIsSaving(true);
    try {
      await reorderProjects(orderedProjects.map(p => p.id));
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save order:", error);
      alert("Failed to save order");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Folder Filter & Save Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#1a1a1a] p-4 rounded-2xl border border-[#2a2a2a]">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <button
            onClick={() => setActiveFolderId("ALL")}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border ${
              activeFolderId === "ALL"
                ? "bg-[#ffbb00] text-black border-[#ffbb00]"
                : "bg-[#222] text-gray-400 border-[#333] hover:border-[#444]"
            }`}
          >
            All Projects
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setActiveFolderId(folder.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap border flex items-center gap-1.5 ${
                activeFolderId === folder.id
                  ? "bg-[#ffbb00] text-black border-[#ffbb00]"
                  : "bg-[#222] text-gray-400 border-[#333] hover:border-[#444]"
              }`}
            >
              <FolderIcon size={12} />
              {folder.name}
            </button>
          ))}
        </div>

        {hasChanges && (
          <button
            onClick={saveOrder}
            disabled={isSaving}
            className="bg-[#ffbb00] text-black px-6 py-2 rounded-xl text-sm font-bold hover:bg-[#ffd24d] transition shadow-lg shadow-[#ffbb00]/10 disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save New Order"}
          </button>
        )}
      </div>

      {/* Projects List */}
      <Reorder.Group axis="y" values={filteredProjects} onReorder={handleReorder} className="space-y-4">
        {filteredProjects.map((project) => (
          <Reorder.Item 
            key={project.id} 
            value={project}
            className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl overflow-hidden active:scale-[0.99] active:shadow-2xl transition-all"
          >
            {editingId === project.id ? (
              <div className="p-6">
                <h3 className="text-lg font-outfit mb-4 text-[#ffbb00]">Editing: {project.title}</h3>
                <ProjectForm
                  folders={folders}
                  tags={tags}
                  metadataOptions={metadataOptions}
                  editProject={project}
                  onCancel={() => setEditingId(null)}
                />
              </div>
            ) : (
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-gray-600 hover:text-[#ffbb00] transition">
                    <GripVertical size={20} />
                  </div>

                  {/* Thumbnail preview */}
                  <div className="w-16 h-12 rounded-lg bg-[#222] overflow-hidden shrink-0">
                    {(() => {
                      const hasExplicitThumb = project.thumbnail && project.thumbnail.trim() !== "" && project.thumbnail !== "null";
                      const thumb = (hasExplicitThumb ? project.thumbnail : null) || getDriveThumbnail(project.platformLink || "") || null;
                      return thumb ? (
                        <img src={thumb} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-600 text-xs">—</div>
                      );
                    })()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-outfit font-medium truncate">{project.title}</h4>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className={`px-2 py-0.5 rounded-full ${project.contentType === "Short Form" ? "bg-purple-900/40 text-purple-300" : "bg-blue-900/40 text-blue-300"}`}>
                        {project.contentType || "—"}
                      </span>
                      {project.folders?.map((f: any) => (
                        <span key={f.id} className="text-gray-400">📁 {f.name}</span>
                      ))}
                      {project.clientName && <span className="text-[#ffbb00]">👤 {project.clientName}</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setEditingId(project.id)}
                    className="px-4 py-1.5 rounded-lg bg-[#333] hover:bg-[#444] text-sm text-white transition"
                  >
                    Edit
                  </button>
                  <form action={deleteProject}>
                    <input type="hidden" name="id" value={project.id} />
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-red-900/30 hover:bg-red-800/50 text-sm text-red-300 transition"
                    >
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 text-gray-500 font-outfit bg-[#1a1a1a] rounded-2xl border border-dashed border-[#2a2a2a]">
          No projects found in this folder.
        </div>
      )}
    </div>
  );
}
