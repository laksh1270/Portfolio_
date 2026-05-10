"use client";

import { motion } from "framer-motion";

interface ClientProps {
  channelName: string;
  channelUrl: string;
  channelImage: string | null;
  subscribers: string | null;
}

export default function ClientsSection({ clients }: { clients: ClientProps[] }) {
  if (clients.length === 0) return null;

  return (
    <section className="py-10 md:py-16 px-6 md:px-20 max-w-5xl mx-auto">
      <h2 className="text-4xl font-outfit uppercase text-[#ffbb00] font-bold mb-12 text-center">
        ↗ MY CLIENTS
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
        {clients.map((client, i) => (
          <motion.a
            key={i}
            href={client.channelUrl}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className="group flex flex-col items-center text-center cursor-pointer"
          >
            {/* Channel Image */}
            <div
              className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-4 border-2 border-[#333] group-hover:border-[#ffbb00] transition-colors shadow-lg group-hover:shadow-[0_0_20px_rgba(255,187,0,0.2)]"
              style={{ background: "var(--theme-surface)" }}
            >
              {client.channelImage ? (
                <img
                  src={client.channelImage}
                  alt={client.channelName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-[#ffbb00]">
                  {client.channelName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Channel Name */}
            <h3 className="text-sm md:text-base font-outfit font-semibold text-[var(--theme-text)] group-hover:text-[#ffbb00] transition-colors leading-tight mb-1">
              {client.channelName}
            </h3>

            {/* Subscribers */}
            {client.subscribers && (
              <p className="text-[10px] md:text-xs text-gray-400 font-inter">
                {client.subscribers} subscribers
              </p>
            )}

            {/* YouTube badge */}
            <div className="mt-2 flex items-center gap-1 text-[10px] text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.64 31.64 0 0 0 0 12a31.64 31.64 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.64 31.64 0 0 0 24 12a31.64 31.64 0 0 0-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
              YouTube
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
