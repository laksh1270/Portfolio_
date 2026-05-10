"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { submitWebFeedback } from "@/app/admin/web/actions";

export default function WebFeedbackForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    formData.append("rating", rating.toString());

    try {
      const res = await submitWebFeedback(formData);
      if (res?.error) {
        setStatus("error");
        setErrorMessage(res.error);
      } else {
        setStatus("success");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-[#ffbb00] p-12 rounded-3xl text-center shadow-[0_0_50px_rgba(255,187,0,0.1)]">
        <div className="w-20 h-20 bg-[#ffbb00] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(255,187,0,0.5)]">
          <svg viewBox="0 0 24 24" className="w-10 h-10 text-black" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h2 className="text-3xl font-outfit font-bold text-white mb-4">Thank You!</h2>
        <p className="text-gray-400 text-lg mb-8">Your feedback has been received and is pending approval.</p>
        <button 
          onClick={() => window.location.href = '/web'}
          className="px-8 py-3 bg-[#ffbb00] text-black rounded-full font-bold hover:bg-[#ffd24d] transition-all"
        >
          Return to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-[#1a1a1a] border border-[#2a2a2a] p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#ffbb00] to-orange-500"></div>
      
      <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
        
        {/* Rating */}
        <div className="flex flex-col items-center justify-center mb-10 pb-10 border-b border-[#2a2a2a]">
          <label className="text-xl font-outfit text-white mb-6 font-medium tracking-wide">How was your experience?</label>
          <div className="flex gap-4 bg-[#111] py-4 px-8 rounded-full border border-[#222] shadow-inner">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                className="transition-all transform hover:scale-110 focus:outline-none"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={42}
                  className="transition-all duration-300"
                  fill={(hoveredRating || rating) >= star ? "#ffbb00" : "transparent"}
                  color={(hoveredRating || rating) >= star ? "#ffbb00" : "#444"}
                  style={{
                    filter: (hoveredRating || rating) >= star ? "drop-shadow(0 0 8px rgba(255,187,0,0.4))" : "none"
                  }}
                />
              </button>
            ))}
          </div>
          <p className="mt-4 text-[#ffbb00] font-outfit font-medium text-lg">
            {rating === 5 ? "Amazing!" : rating === 4 ? "Great" : rating === 3 ? "Good" : rating === 2 ? "Okay" : "Needs Improvement"}
          </p>
        </div>

        {/* Feedback Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium uppercase tracking-wider pl-1">Project Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              name="projectName"
              required
              placeholder="e.g. E-Commerce Dashboard"
              className="w-full bg-[#111] border border-[#333] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all placeholder-gray-600"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium uppercase tracking-wider pl-1">Your Feedback <span className="text-red-500">*</span></label>
            <textarea
              name="feedback"
              required
              rows={4}
              placeholder="What was it like working with me? What did you like about the web application?"
              className="w-full bg-[#111] border border-[#333] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all resize-none placeholder-gray-600 text-lg"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium uppercase tracking-wider pl-1">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="John Doe (Optional)"
                className="w-full bg-[#111] border border-[#333] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all placeholder-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium uppercase tracking-wider pl-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Private (Optional)"
                className="w-full bg-[#111] border border-[#333] rounded-2xl px-5 py-4 text-white focus:outline-none focus:border-[#ffbb00] focus:ring-1 focus:ring-[#ffbb00] transition-all placeholder-gray-600"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[#2a2a2a]">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold text-center">Project Links (Optional)</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input name="liveLink" placeholder="Live Site URL" className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-all placeholder-gray-600" />
              <input name="githubLink" placeholder="GitHub Repository URL" className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-all placeholder-gray-600" />
              <input name="figmaLink" placeholder="Figma Design URL" className="w-full bg-[#111] border border-[#333] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-all placeholder-gray-600" />
            </div>
          </div>
        </div>

        {status === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center">
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full bg-[#ffbb00] text-black py-4 rounded-2xl font-bold text-xl uppercase tracking-widest hover:bg-[#ffd24d] hover:shadow-[0_0_30px_rgba(255,187,0,0.2)] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {status === "submitting" ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}
