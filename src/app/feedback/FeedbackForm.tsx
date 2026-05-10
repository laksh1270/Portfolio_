"use client";
import { useState } from "react";
import { submitFeedback } from "../admin/actions";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function FeedbackForm() {
  const [rating, setRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(formData: FormData) {
    setStatus("submitting");
    formData.set("rating", rating.toString());
    const res = await submitFeedback(formData);
    if (res?.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20 px-6 bg-[#1a1a1a] rounded-3xl border border-[#2a2a2a]"
      >
        <div className="text-6xl mb-6">🎉</div>
        <h2 className="text-3xl font-outfit font-bold text-[#ffbb00] mb-4">Thank You!</h2>
        <p className="text-gray-400 max-w-md mx-auto leading-relaxed">
          Your feedback has been submitted successfully. It will be visible on the portfolio once reviewed by the editor.
        </p>
        <button 
          onClick={() => window.location.href = "/"}
          className="mt-8 px-8 py-3 bg-[#ffbb00] text-black font-bold rounded-xl hover:bg-[#ffd24d] transition-all"
        >
          Back to Portfolio
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form action={handleSubmit} className="space-y-8 bg-[#1a1a1a] p-8 md:p-12 rounded-3xl border border-[#2a2a2a] shadow-2xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffbb00]/5 blur-3xl rounded-full" />
        
        <div>
          <h2 className="text-2xl font-outfit font-bold text-white mb-2">Share Your Experience</h2>
          <p className="text-gray-500 text-sm">Your feedback helps me improve and grow. Thank you!</p>
        </div>

        {/* Rating Section */}
        <div className="space-y-3">
          <label className="text-gray-400 text-xs uppercase tracking-widest font-bold">How was your experience?</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-transform active:scale-90"
              >
                <Star 
                  size={32} 
                  fill={(hoveredRating || rating) >= star ? "#ffbb00" : "transparent"} 
                  color={(hoveredRating || rating) >= star ? "#ffbb00" : "#444"}
                  className="transition-colors duration-200"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs uppercase tracking-widest font-bold">Your Name (Optional)</label>
          <input 
            name="name" 
            placeholder="e.g. John Doe"
            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#ffbb00] transition-colors"
          />
        </div>

        {/* Feedback */}
        <div className="space-y-2">
          <label className="text-gray-400 text-xs uppercase tracking-widest font-bold">Your Feedback <span className="text-red-500">*</span></label>
          <textarea 
            name="feedback" 
            required
            rows={4}
            placeholder="What did you like about the edit?"
            className="w-full bg-[#111] border border-[#2a2a2a] rounded-xl px-4 py-4 text-white focus:outline-none focus:border-[#ffbb00] transition-colors resize-none"
          />
        </div>

        {/* Optional Fields Divider */}
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[#2a2a2a]"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-gray-600 bg-[#1a1a1a] px-2">
            The following are optional
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Email Address</label>
            <input 
              name="email" 
              type="email"
              placeholder="john@example.com"
              className="w-full bg-transparent border-b border-[#2a2a2a] px-0 py-2 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-colors"
            />
          </div>
          <div className="space-y-2">
            <label className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Phone Number</label>
            <input 
              name="phone" 
              placeholder="+1 234 567 890"
              className="w-full bg-transparent border-b border-[#2a2a2a] px-0 py-2 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-colors"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-gray-500 text-[10px] uppercase tracking-widest font-bold">Video Link (Edited by me)</label>
          <input 
            name="videoLink" 
            placeholder="YouTube / Drive / Instagram link"
            className="w-full bg-transparent border-b border-[#2a2a2a] px-0 py-2 text-sm text-white focus:outline-none focus:border-[#ffbb00] transition-colors"
          />
        </div>

        <button 
          type="submit" 
          disabled={status === "submitting"}
          className="w-full py-4 bg-[#ffbb00] text-black font-bold rounded-xl hover:bg-[#ffd24d] transition-all disabled:opacity-50 flex items-center justify-center gap-2 text-lg shadow-xl shadow-[#ffbb00]/10"
        >
          {status === "submitting" ? "Sending..." : "Submit Feedback"}
        </button>
        
        {status === "error" && (
          <p className="text-red-500 text-center text-xs mt-4">Something went wrong. Please try again.</p>
        )}
      </form>
    </div>
  );
}
