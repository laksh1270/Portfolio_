"use client";

import { useState } from "react";
import { createProject, updateProject } from "./actions";

interface ProjectFormProps {
  folders: any[];
  tags: any[];
  metadataOptions: any[];
  editProject?: any;
  onCancel?: () => void;
}

export default function ProjectForm({ folders, tags, metadataOptions, editProject, onCancel }: ProjectFormProps) {
  const isEdit = !!editProject;

  const [selectedFolders, setSelectedFolders] = useState<string[]>(
    editProject?.folders?.map((f: any) => f.id) || []
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    editProject?.tags?.map((t: any) => t.id) || []
  );
  const [selectedMetadataOptions, setSelectedMetadataOptions] = useState<string[]>(
    editProject?.metadataOptions?.map((o: any) => o.id) || []
  );

  const [showInMain, setShowInMain] = useState<boolean>(
    editProject?.showInMain !== false
  );

  const toggleFolder = (id: string) => {
    setSelectedFolders((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: string) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const toggleMetadataOption = (id: string) => {
    setSelectedMetadataOptions((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const METADATA_TYPES = [
    { label: "Language", value: "LANGUAGE" },
    { label: "Subject Matter", value: "SUBJECT_MATTER" },
    { label: "Visual Style", value: "VISUAL_STYLE" },
    { label: "Narrative Form", value: "NARRATIVE_FORM" },
    { label: "Editing Style", value: "EDITING_STYLE" },
  ];

  return (
    <form action={isEdit ? updateProject : createProject} className="flex flex-col gap-6 text-sm">
      {isEdit && <input type="hidden" name="id" value={editProject.id} />}
      <input type="hidden" name="showInMain" value={showInMain.toString()} />
      <input type="hidden" name="folderIds" value={selectedFolders.join(",")} />
      <input type="hidden" name="tagIds" value={selectedTags.join(",")} />
      <input type="hidden" name="metadataOptionIds" value={selectedMetadataOptions.join(",")} />

      {/* ── Required Fields ── */}
      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Project Title <span className="text-red-500">*</span></label>
        <input name="title" required defaultValue={editProject?.title || ""} className="bg-transparent border border-[#444] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="e.g. My Awesome Video" />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Platform Link <span className="text-red-500">*</span></label>
        <input name="platformLink" required defaultValue={editProject?.platformLink || ""} className="bg-transparent border border-[#444] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="https://drive.google.com/... or https://youtube.com/..." />
        <span className="text-xs text-gray-500 mt-1">Google Drive / YouTube / Instagram link</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Thumbnail URL <span className="text-gray-500 text-xs">(leave blank for auto-detect)</span></label>
        <input name="thumbnail" defaultValue={editProject?.thumbnail || ""} className="bg-transparent border border-[#444] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="https://..." />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-gray-300 font-medium">Video Format <span className="text-red-500">*</span></label>
        <select name="contentType" className="bg-[#111] border border-[#444] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" required defaultValue={editProject?.contentType || "Short Form"}>
          <option value="Short Form">Short Form (Shorts, Reels, TikToks)</option>
          <option value="Long Form">Long Form (YouTube, Documentary, Edits)</option>
        </select>
      </div>

      {/* ── Assign to Folders ── */}
      <div className="flex flex-col gap-3 bg-[#222] border border-[#333] rounded-xl p-4">
        <label className="text-gray-200 font-medium text-base">📁 Assign to Folders</label>
        <div className="flex flex-wrap gap-2">
          {/* Main Folder Toggle */}
          <button
            type="button"
            onClick={() => setShowInMain(!showInMain)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
              showInMain
                ? "bg-[#ffbb00] text-black border-[#ffbb00] shadow-md"
                : "bg-transparent text-gray-400 border-[#555] hover:border-[#ffbb00] hover:text-white"
            }`}
          >
            {showInMain ? "✓ " : ""}All Projects (Main Grid)
          </button>
          
          {folders.length > 0 && folders.map((folder) => (
            <button
              key={folder.id}
              type="button"
              onClick={() => toggleFolder(folder.id)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                selectedFolders.includes(folder.id)
                  ? "bg-[#ffbb00] text-black border-[#ffbb00] shadow-md"
                  : "bg-transparent text-gray-400 border-[#555] hover:border-[#ffbb00] hover:text-white"
              }`}
            >
              {selectedFolders.includes(folder.id) ? "✓ " : ""}{folder.name}
            </button>
          ))}
        </div>
      </div>

      {/* ── Editing Software (Tags) Multi-Select ── */}
      <div className="flex flex-col gap-3 bg-[#222] border border-[#333] rounded-xl p-4">
        <label className="text-gray-200 font-medium text-base">🛠️ Editing Software Used</label>
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => toggleTag(tag.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  selectedTags.includes(tag.id)
                    ? "bg-purple-600 text-white border-purple-500 shadow-md"
                    : "bg-transparent text-gray-400 border-[#555] hover:border-purple-400 hover:text-white"
                }`}
              >
                {selectedTags.includes(tag.id) ? "✓ " : ""}{tag.name}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-xs">No software tags created yet. Create them in the sidebar →</p>
        )}
      </div>

      {/* ── Client Details ── */}
      <div className="bg-[#1f1f1f] border border-[#333] rounded-xl p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-full mb-2">
          <p className="text-gray-200 font-medium">👤 Client Information</p>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-400 text-xs uppercase tracking-wider">Client Name</label>
          <input name="clientName" defaultValue={editProject?.clientName || ""} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="e.g. The Boho Sapiens" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-400 text-xs uppercase tracking-wider">Client Link</label>
          <input name="clientLink" defaultValue={editProject?.clientLink || ""} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="https://youtube.com/@channel" />
        </div>
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="text-gray-400 text-xs uppercase tracking-wider">Client Avatar Image URL</label>
          <input name="clientAvatar" defaultValue={editProject?.clientAvatar || ""} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="https://... (Direct image link)" />
          <span className="text-[10px] text-gray-500 italic mt-0.5">Leave blank to show platform logo</span>
        </div>
      </div>

      {/* ── Metadata Attributes Multi-Select ── */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 space-y-8">
        <div className="flex items-center gap-3 border-b border-[#333] pb-4">
          <span className="text-xl">🏷️</span>
          <div>
            <p className="text-gray-200 font-medium">Project Attributes</p>
            <p className="text-gray-500 text-xs">Select multiple options for each category.</p>
          </div>
        </div>

        {METADATA_TYPES.map((type) => {
          const options = metadataOptions.filter((o) => o.type === type.value);
          return (
            <div key={type.value} className="flex flex-col gap-3">
              <label className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">{type.label}</label>
              {options.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => toggleMetadataOption(option.id)}
                      className={`px-3 py-1.5 rounded-md text-[11px] font-medium border transition-all ${
                        selectedMetadataOptions.includes(option.id)
                          ? "bg-blue-600 text-white border-blue-500 shadow-sm"
                          : "bg-transparent text-gray-500 border-[#333] hover:border-blue-400 hover:text-white"
                      }`}
                    >
                      {selectedMetadataOptions.includes(option.id) ? "✓ " : ""}{option.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 text-[10px] italic">No options found. Add them in the sidebar →</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-1.5 px-1">
        <label className="text-gray-400 text-xs uppercase tracking-wider">Project Description</label>
        <textarea name="description" defaultValue={editProject?.description || ""} rows={3} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00] resize-none" placeholder="Briefly describe the project..." />
      </div>

      {/* ── Reach Metrics ── */}
      <div className="bg-[#222] border border-[#333] rounded-xl p-4">
        <p className="text-gray-200 font-medium mb-3">📈 Reach Metrics</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Views</label>
            <input name="views" defaultValue={editProject?.views || ""} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="e.g. 1.2M" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-400 text-[10px] uppercase tracking-widest font-bold">Total Likes</label>
            <input name="likes" defaultValue={editProject?.likes || ""} className="bg-transparent border border-[#333] rounded-lg p-3 text-white focus:outline-none focus:border-[#ffbb00]" placeholder="e.g. 50K" />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-[#333]">
        {onCancel && (
          <button type="button" onClick={onCancel} className="px-6 py-2.5 rounded-lg bg-[#333] hover:bg-[#444] text-white">Cancel</button>
        )}
        <button type="submit" className="px-8 py-2.5 rounded-lg bg-[#ffbb00] hover:bg-[#ffd24d] text-black font-bold transition-colors">
          {isEdit ? "Update Project" : "Save Project"}
        </button>
      </div>
    </form>
  );
}
