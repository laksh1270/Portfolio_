"use client";

import { createWebTechStack, deleteWebTechStack } from "./actions";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";

export default function WebTechStackForm({ techStacks }: { techStacks: any[] }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    const formData = new FormData(e.currentTarget);
    const res = await createWebTechStack(formData);
    
    if (res?.error) {
      setStatus("error");
      setErrorMsg(res.error);
    } else {
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setStatus("idle"), 1500);
    }
  };

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 shadow-sm mb-6">
      <h2 className="text-xl font-outfit mb-4 font-medium text-[#ffbb00]">Manage Tech Stacks</h2>
      <p className="text-sm text-gray-400 mb-6">Create tags here to reuse them quickly when adding projects.</p>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input 
          name="name" 
          placeholder="e.g. React, Next.js" 
          required
          className="flex-1 bg-[#111] border border-[#333] rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#ffbb00]"
        />
        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="bg-[#ffbb00] hover:bg-[#ffd24d] text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
        >
          <Plus size={18} /> {status === "submitting" ? "Adding..." : "Add"}
        </button>
      </form>
      
      {status === "error" && <p className="text-red-400 text-sm mb-4">{errorMsg}</p>}

      {techStacks.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {techStacks.map(t => (
            <div key={t.id} className="bg-[#111] border border-[#333] text-gray-300 px-3 py-1.5 rounded-lg flex items-center gap-3 text-sm">
              <span className="font-medium tracking-wider">{t.name}</span>
              <form action={deleteWebTechStack}>
                <input type="hidden" name="id" value={t.id} />
                <button type="submit" className="text-red-400 hover:text-red-300" onClick={(e) => {
                  if (!confirm("Delete this tech stack?")) e.preventDefault();
                }}>
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No tech stacks added yet.</p>
      )}
    </div>
  );
}
