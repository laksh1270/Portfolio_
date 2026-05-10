"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({ 
  videoPendingCount, 
  webPendingCount 
}: { 
  videoPendingCount: number, 
  webPendingCount: number 
}) {
  const pathname = usePathname();

  const isWeb = pathname?.startsWith("/admin/web");
  const isVideo = pathname?.startsWith("/admin/video") || pathname === "/admin/notifications";
  
  if (pathname === "/admin") {
    // On the chooser page, we just show a back to site link
    return (
      <div className="flex gap-4 md:gap-6">
        <Link href="/" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors">View Video Site</Link>
        <Link href="/web" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors">View Web Site</Link>
      </div>
    );
  }

  if (isWeb) {
    return (
      <div className="flex gap-4 md:gap-6">
        <Link href="/admin/web" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors">Projects</Link>
        <Link href="/admin/web/notifications" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors flex items-center gap-2">
          Notifications
          {webPendingCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full animate-pulse font-bold">{webPendingCount}</span>
          )}
        </Link>
        <div className="w-px h-4 bg-[#333] self-center"></div>
        <Link href="/admin" className="text-xs md:text-sm text-gray-500 hover:text-white transition-colors">Switch to Video</Link>
      </div>
    );
  }

  // Default to Video (or fallback)
  return (
    <div className="flex gap-4 md:gap-6">
      <Link href="/admin/video" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors">Projects</Link>
      <Link href="/admin/notifications" className="text-xs md:text-sm font-medium hover:text-[#ffbb00] transition-colors flex items-center gap-2">
        Notifications
        {videoPendingCount > 0 && (
          <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full animate-pulse font-bold">{videoPendingCount}</span>
        )}
      </Link>
      <div className="w-px h-4 bg-[#333] self-center"></div>
      <Link href="/admin" className="text-xs md:text-sm text-gray-500 hover:text-white transition-colors">Switch to Web</Link>
    </div>
  );
}
