import prisma from "@/lib/db";
import { Star, Check, Trash2, Mail, Phone, Link as LinkIcon, Clock } from "lucide-react";
import Link from "next/link";
import TestimonialList from "./TestimonialList";

export default async function NotificationsPage() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
  });

  const pending = testimonials.filter(t => !t.approved);
  const approved = testimonials.filter(t => t.approved);

  return (
    <main className="p-6 md:p-10 max-w-6xl mx-auto pb-32">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-outfit font-bold text-white">Notifications</h1>
          <p className="text-gray-500 text-xs md:text-sm">Review and arrange client feedback</p>
        </div>
        <Link 
          href="/admin"
          className="px-4 py-2 bg-[#222] text-white rounded-lg border border-[#333] hover:bg-[#333] transition-colors text-xs md:text-sm"
        >
          ← Back
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Pending Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-outfit font-bold text-[#ffbb00]">Pending</h2>
            <span className="bg-[#ffbb00] text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{pending.length}</span>
          </div>

          {pending.length === 0 ? (
            <div className="bg-[#111] border border-dashed border-[#333] rounded-2xl p-10 text-center text-gray-600 text-sm">
              No pending feedback.
            </div>
          ) : (
            <TestimonialList testimonials={pending} isPending />
          )}
        </div>

        {/* Approved Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg md:text-xl font-outfit font-bold text-green-500">Approved</h2>
            <span className="bg-green-500 text-black text-[10px] font-bold px-2 py-0.5 rounded-full">{approved.length}</span>
          </div>
          <p className="text-[10px] text-gray-500 italic mb-4">Drag and drop to reorder the public display.</p>

          {approved.length === 0 ? (
            <div className="bg-[#111] border border-dashed border-[#333] rounded-2xl p-10 text-center text-gray-600 text-sm">
              No approved feedback yet.
            </div>
          ) : (
            <TestimonialList testimonials={approved} />
          )}
        </div>

      </div>
    </main>
  );
}
