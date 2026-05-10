"use client";

import { useState } from "react";
import { createWebProject, updateWebProject } from "./actions";
import { X, Plus } from "lucide-react";

export default function WebProjectForm({ project, existingTags = [] }: { project?: any, existingTags?: string[] }) {
  const isEditing = !!project;
  const [techStack, setTechStack] = useState<string[]>(project?.techStack || []);
  const [techInput, setTechInput] = useState("");
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [imageInput, setImageInput] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleAddTech = () => {
    if (techInput.trim() && !techStack.includes(techInput.trim())) {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleAddImage = () => {
    if (imageInput.trim() && images.length < 3) {
      setImages([...images, imageInput.trim()]);
      setImageInput("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("techStack", techStack.join(","));
    formData.append("images", images.join(","));

    if (isEditing) {
      formData.append("id", project.id);
      await updateWebProject(formData);
    } else {
      await createWebProject(formData);
    }
    
    setStatus("success");
    setTimeout(() => {
      setStatus("idle");
      if (!isEditing) {
        (e.target as HTMLFormElement).reset();
        setTechStack([]);
        setImages([]);
      }
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-medium">Project Name *</label>
        <input
          name="name"
          defaultValue={project?.name || ""}
          required
          placeholder="e.g. E-Commerce Dashboard"
          className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-medium">Description (Optional)</label>
        <textarea
          name="description"
          defaultValue={project?.description || ""}
          rows={3}
          placeholder="What does this project do?"
          className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all resize-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400 font-medium">GitHub Link</label>
          <input
            name="githubLink"
            defaultValue={project?.githubLink || ""}
            placeholder="https://github.com/..."
            className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm text-gray-400 font-medium">Live Link</label>
          <input
            name="liveLink"
            defaultValue={project?.liveLink || ""}
            placeholder="https://..."
            className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-400 font-medium">Thumbnail URL</label>
        <input
          name="thumbnail"
          defaultValue={project?.thumbnail || ""}
          placeholder="Primary image URL (e.g. Imgur, Drive link...)"
          className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all"
        />
      </div>

      {/* Tech Stack Bubbles */}
      <div className="space-y-3 bg-[#111] p-4 rounded-xl border border-[#333]">
        <label className="text-sm text-gray-400 font-medium block">Tech Stack</label>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTech();
              }
            }}
            placeholder="e.g. React, Next.js..."
            className="flex-1 bg-transparent border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00]"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="bg-[#222] border border-[#444] hover:bg-[#ffbb00] hover:text-black transition-colors px-3 py-2 rounded-lg"
          >
            <Plus size={20} />
          </button>
        </div>
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {techStack.map((tech) => (
              <span key={tech} className="bg-[#ffbb00]/10 border border-[#ffbb00]/20 text-[#ffbb00] text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 uppercase tracking-wider">
                {tech}
                <button type="button" onClick={() => setTechStack(techStack.filter(t => t !== tech))} className="hover:text-red-400">
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>
        )}
        
        {/* Existing Tech Stack Suggestions */}
        {existingTags.filter(t => !techStack.includes(t)).length > 0 && (
          <div className="mt-4 pt-3 border-t border-[#333]">
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest font-bold">Quick Select</p>
            <div className="flex flex-wrap gap-2">
              {existingTags.filter(t => !techStack.includes(t)).map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => setTechStack([...techStack, tech])}
                  className="bg-[#222] hover:bg-[#333] border border-[#444] hover:border-[#ffbb00] text-gray-300 hover:text-[#ffbb00] text-[10px] font-bold px-2.5 py-1 rounded-full transition-colors uppercase tracking-wider flex items-center gap-1"
                >
                  <Plus size={10} /> {tech}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Images Array (max 3) */}
      <div className="space-y-3 bg-[#111] p-4 rounded-xl border border-[#333]">
        <label className="text-sm text-gray-400 font-medium flex justify-between">
          <span>Project Images (Max 3)</span>
          <span className="text-xs">{images.length}/3</span>
        </label>
        {images.length < 3 && (
          <div className="flex gap-2">
            <input
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
              placeholder="Image URL..."
              className="flex-1 bg-transparent border border-[#444] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00]"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="bg-[#222] border border-[#444] hover:bg-[#ffbb00] hover:text-black transition-colors px-3 py-2 rounded-lg"
            >
              <Plus size={20} />
            </button>
          </div>
        )}
        {images.length > 0 && (
          <div className="flex flex-col gap-2 mt-3">
            {images.map((img, i) => (
              <div key={i} className="flex items-center justify-between bg-[#222] p-2 rounded-lg border border-[#444] text-xs truncate gap-4">
                <span className="truncate">{img}</span>
                <button type="button" onClick={() => setImages(images.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300 shrink-0">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full bg-[#ffbb00] text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#ffd24d] transition-all disabled:opacity-50"
      >
        {status === "submitting" ? "Saving..." : status === "success" ? "Saved!" : isEditing ? "Save Changes" : "Create Web Project"}
      </button>
    </form>
  );
}
