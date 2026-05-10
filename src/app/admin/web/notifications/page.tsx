import prisma from "@/lib/db";
import WebTestimonialList from "./WebTestimonialList";

export default async function WebNotificationsPage() {
  const testimonials = await prisma.webTestimonial.findMany({
    orderBy: [
      { displayOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <main className="p-6 md:p-10 max-w-5xl mx-auto pb-32">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">
          Web Dev <span className="text-[#ffbb00]">Feedback</span>
        </h1>
        <p className="text-gray-400">Review and approve client feedback before it goes live on your web portfolio.</p>
      </div>

      <WebTestimonialList testimonials={testimonials} />
    </main>
  );
}
