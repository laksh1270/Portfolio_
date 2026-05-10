import Link from "next/link";
import { MonitorPlay, Code2 } from "lucide-react";

export default function AdminChooserPage() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
            Select <span className="text-[#ffbb00]">Dashboard</span>
          </h1>
          <p className="text-gray-400 text-lg">Which portfolio would you like to manage today?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video Editing Admin */}
          <Link href="/admin/video" className="group">
            <div className="bg-[#1a1a1a] border border-[#333] hover:border-[#ffbb00] rounded-3xl p-10 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,187,0,0.15)] hover:-translate-y-2">
              <div className="w-24 h-24 bg-[#ffbb00]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MonitorPlay size={48} className="text-[#ffbb00]" />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white mb-3">Video Editing</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Manage your video editing portfolio, including projects, folders, tags, show reel, and client testimonials.
              </p>
            </div>
          </Link>

          {/* Web Development Admin */}
          <Link href="/admin/web" className="group">
            <div className="bg-[#1a1a1a] border border-[#333] hover:border-[#ffbb00] rounded-3xl p-10 h-full flex flex-col items-center text-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,187,0,0.15)] hover:-translate-y-2">
              <div className="w-24 h-24 bg-[#ffbb00]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code2 size={48} className="text-[#ffbb00]" />
              </div>
              <h2 className="text-2xl font-outfit font-bold text-white mb-3">Web Development</h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Manage your web development portfolio, full-stack projects, tech stack tags, and client feedback.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
