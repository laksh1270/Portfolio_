"use client";

import { useRef, useState } from "react";

function getEmbedUrl(url: string) {
  if (!url) return null;
  if (url.includes("youtube.com/watch") || url.includes("youtu.be")) {
    const videoId = url.includes("youtu.be")
      ? url.split("youtu.be/")[1]?.split("?")[0]
      : new URLSearchParams(new URL(url).search).get("v");
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&vq=hd1080`;
  }
  if (url.includes("youtube.com/shorts/")) {
    const videoId = url.split("youtube.com/shorts/")[1]?.split("?")[0];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&vq=hd1080`;
  }
  if (url.includes("instagram.com/reel/") || url.includes("instagram.com/p/")) {
    return url.replace(/\/?$/, "") + "/embed";
  }
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = url.split("/file/d/")[1]?.split("/")[0];
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
}

function parseVideoUrl(url: string) {
  if (!url) return null;
  // Convert Google Drive view links to direct download stream links for native HTML5 video
  if (url.includes("drive.google.com/file/d/")) {
    const fileId = url.split("/file/d/")[1]?.split("/")[0];
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

export default function ShowReelSection({ url, thumbnail }: { url: string | null; thumbnail?: string | null }) {
  if (!url) return null;

  const streamUrl = parseVideoUrl(url);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasClickedIframe, setHasClickedIframe] = useState(false);

  const isIframe = 
    url.includes("youtube.com") || 
    url.includes("youtu.be") || 
    url.includes("instagram.com") ||
    url.includes("drive.google.com");

  if (isIframe) {
    return (
      <section className="py-8 md:py-12 px-6 md:px-20 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-outfit font-bold text-center mb-8 md:mb-10 text-[#ffbb00]">Intro Video</h2>
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#333] shadow-[0_0_40px_rgba(255,187,0,0.1)] bg-[#0a0a0a]">
          {!hasClickedIframe && thumbnail ? (
            <div className="absolute inset-0 z-10 cursor-pointer group" onClick={() => setHasClickedIframe(true)}>
              <img src={thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 flex items-center justify-center transition-colors">
                <div className="w-20 h-20 rounded-full bg-[#ffbb00]/90 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                  <svg className="w-8 h-8 pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                </div>
              </div>
            </div>
          ) : null}
          {(!thumbnail || hasClickedIframe) && (
            <iframe
              src={getEmbedUrl(url) || ""}
              className={`w-full border-0 absolute ${url?.includes("drive.google.com") ? "h-[calc(100%+56px)] -top-[56px] left-0" : "h-full inset-0"}`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      </section>
    );
  }

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="py-8 md:py-12 px-6 md:px-20 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-outfit font-bold text-center mb-8 md:mb-10 text-[#ffbb00]">Intro Video</h2>
      
      <div 
        className="relative w-full max-h-[80vh] flex items-center justify-center bg-[#0a0a0a] rounded-2xl overflow-hidden border border-[#333] shadow-[0_0_40px_rgba(255,187,0,0.1)] group cursor-pointer"
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={streamUrl || ""}
          poster={thumbnail || undefined}
          className="w-full h-full object-contain max-h-[80vh]"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        {/* Play/Pause Overlay */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 group-hover:opacity-100 bg-black/20' : 'opacity-100 bg-black/40'}`}>
          <div className="w-20 h-20 rounded-full bg-[#ffbb00]/90 text-black flex items-center justify-center shadow-lg transition-transform hover:scale-110">
            {isPlaying ? (
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
            ) : (
              <svg className="w-8 h-8 pl-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            )}
          </div>
        </div>

        {/* Mute/Unmute Control */}
        <button 
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-10 w-12 h-12 bg-black/60 hover:bg-black/80 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110 border border-[#444]"
        >
          {isMuted ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" /></svg>
          )}
        </button>
      </div>
    </section>
  );
}
