"use client";
import { useState, useEffect } from "react";
import { Reorder } from "framer-motion";
import { Star, Check, Trash2, Mail, Phone, Link as LinkIcon, Clock, GripVertical } from "lucide-react";
import { approveTestimonial, deleteTestimonial, reorderTestimonials } from "../actions";

export default function TestimonialList({ testimonials, isPending }: { testimonials: any[], isPending?: boolean }) {
  const [items, setItems] = useState(testimonials);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setItems(testimonials);
  }, [testimonials]);

  const handleReorder = (newItems: any[]) => {
    setItems(newItems);
    setHasChanges(true);
  };

  const saveOrder = async () => {
    setIsSaving(true);
    try {
      await reorderTestimonials(items.map(t => t.id));
      setHasChanges(false);
    } catch (error) {
      console.error("Failed to save order:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="space-y-6">
        {items.map((t) => (
          <TestimonialCard key={t.id} testimonial={t} isPending />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasChanges && (
        <button 
          onClick={saveOrder}
          disabled={isSaving}
          className="w-full py-2 bg-[#ffbb00] text-black font-bold rounded-lg hover:bg-[#ffd24d] transition-all text-sm mb-4"
        >
          {isSaving ? "Saving Order..." : "Save New Order"}
        </button>
      )}
      
      <Reorder.Group axis="y" values={items} onReorder={handleReorder} className="space-y-4">
        {items.map((t) => (
          <Reorder.Item key={t.id} value={t}>
            <TestimonialCard testimonial={t} showGrip />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
}

function TestimonialCard({ testimonial, isPending, showGrip }: { testimonial: any, isPending?: boolean, showGrip?: boolean }) {
  return (
    <div className={`bg-[#1a1a1a] border ${isPending ? "border-[#ffbb00]/20" : "border-[#2a2a2a]"} rounded-2xl p-6 relative group overflow-hidden`}>
      {isPending && (
        <div className="absolute top-0 left-0 w-1 h-full bg-[#ffbb00]" />
      )}
      
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-start gap-3">
          {showGrip && (
            <div className="mt-1 cursor-grab active:cursor-grabbing text-gray-600 hover:text-[#ffbb00]">
              <GripVertical size={20} />
            </div>
          )}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-white">{testimonial.name}</span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={10} fill={i < testimonial.rating ? "#ffbb00" : "transparent"} color={i < testimonial.rating ? "#ffbb00" : "#444"} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <Clock size={10} />
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">
        "{testimonial.feedback}"
      </p>

      {(testimonial.email || testimonial.phone || testimonial.videoLink) && (
        <div className="grid grid-cols-1 gap-2 mb-6 p-3 bg-black/30 rounded-xl">
          {testimonial.email && (
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <Mail size={12} className="text-[#ffbb00]" /> {testimonial.email}
            </div>
          )}
          {testimonial.phone && (
            <div className="flex items-center gap-2 text-[10px] text-gray-500">
              <Phone size={12} className="text-[#ffbb00]" /> {testimonial.phone}
            </div>
          )}
          {testimonial.videoLink && (
            <div className="flex items-center gap-2 text-[10px] text-gray-500 overflow-hidden">
              <LinkIcon size={12} className="text-[#ffbb00]" /> 
              <a href={testimonial.videoLink} target="_blank" className="truncate hover:underline text-blue-400">
                {testimonial.videoLink}
              </a>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-2 justify-end">
        {isPending && (
          <form action={approveTestimonial}>
            <input type="hidden" name="id" value={testimonial.id} />
            <button 
              type="submit" 
              className="flex items-center gap-2 px-4 py-1.5 bg-green-600/20 text-green-400 text-xs font-bold rounded-lg hover:bg-green-600 hover:text-white transition-all border border-green-600/30"
            >
              <Check size={14} /> Approve
            </button>
          </form>
        )}
        <form action={deleteTestimonial}>
          <input type="hidden" name="id" value={testimonial.id} />
          <button 
            type="submit" 
            className="flex items-center gap-2 px-4 py-1.5 bg-red-600/10 text-red-400 text-xs font-bold rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-600/20"
          >
            <Trash2 size={14} /> Delete
          </button>
        </form>
      </div>
    </div>
  );
}
