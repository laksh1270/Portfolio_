"use client";

import { updateShowReel } from "./actions";

export default function ShowReelForm({ 
  initialUrl, 
  initialThumbnail 
}: { 
  initialUrl: string | null;
  initialThumbnail: string | null;
}) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
      <h3 className="text-lg font-outfit mb-2 text-[#ffbb00]">Intro Video</h3>
      <p className="text-xs text-gray-400 mb-4">
        Add a direct video link (Google Drive, YouTube, etc.) to display under your home screen.
      </p>
      
      <form action={updateShowReel} className="flex flex-col gap-3">
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-xs uppercase tracking-wider font-medium">Video URL</label>
          <input 
            name="showReelUrl" 
            defaultValue={initialUrl || ""} 
            placeholder="https://drive.google.com/..." 
            className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-[#ffbb00] text-white" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-gray-500 text-xs uppercase tracking-wider font-medium">Custom Thumbnail URL (Optional)</label>
          <input 
            name="showReelThumbnail" 
            defaultValue={initialThumbnail || ""} 
            placeholder="https://.../thumbnail.jpg" 
            className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-3 text-sm focus:outline-none focus:border-[#ffbb00] text-white" 
          />
        </div>
        <button 
          type="submit" 
          className="self-end bg-[#ffbb00] text-black px-6 py-2 rounded-lg text-sm font-bold hover:bg-[#ffd24d] transition-colors"
        >
          Save Intro Video
        </button>
      </form>
    </div>
  );
}
