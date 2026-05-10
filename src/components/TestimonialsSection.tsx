import prisma from "@/lib/db";
import { Star, Quote } from "lucide-react";

export default async function TestimonialsSection() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" }
    ],
    take: 6
  });

  if (testimonials.length === 0) return null;

  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-7xl mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-4">
            What My <span className="text-[#ffbb00]">Clients Say</span>
          </h2>
          <p className="text-gray-500 max-w-xl">
            Real feedback from creators and brands I've worked with.
          </p>
        </div>
        <a 
          href="/feedback" 
          className="px-8 py-3 bg-transparent border border-[#ffbb00] text-[#ffbb00] rounded-full font-bold hover:bg-[#ffbb00] hover:text-black transition-all text-sm uppercase tracking-widest"
        >
          Give Feedback
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div 
            key={t.id} 
            className="bg-[#1a1a1a] border border-[#2a2a2a] p-8 rounded-3xl relative group hover:border-[#ffbb00]/30 transition-all flex flex-col"
          >
            <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Quote size={40} className="text-[#ffbb00]" />
            </div>

            <div className="flex gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  size={14} 
                  fill={i < t.rating ? "#ffbb00" : "transparent"} 
                  color={i < t.rating ? "#ffbb00" : "#444"} 
                />
              ))}
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed italic flex-grow">
              "{t.feedback}"
            </p>

            <div className="flex items-center gap-3 mt-auto pt-6 border-t border-[#2a2a2a]">
              <div className="w-10 h-10 rounded-full bg-[#ffbb00] text-black flex items-center justify-center font-bold font-outfit">
                {t.name?.charAt(0) || "A"}
              </div>
              <div>
                <h4 className="text-white font-bold text-sm font-outfit">{t.name}</h4>
                <p className="text-gray-500 text-[10px] uppercase tracking-wider">Happy Client</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
