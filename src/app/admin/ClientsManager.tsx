"use client";

import { useState } from "react";
import { createClient, deleteClient, toggleClientsSection, reorderClients } from "./actions";
import { Trash2, Play, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

export default function ClientsManager({
  clients: initialClients,
  showClients: initialShow,
}: {
  clients: any[];
  showClients: boolean;
}) {
  const [clients, setClients] = useState(initialClients);
  const [enabled, setEnabled] = useState(initialShow);

  async function handleToggle() {
    const newVal = !enabled;
    setEnabled(newVal);
    await toggleClientsSection(newVal);
  }

  async function handleDragEnd(result: any) {
    if (!result.destination) return;
    const newItems = Array.from(clients);
    const [moved] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, moved);
    setClients(newItems);
    await reorderClients(newItems.map((c) => c.id));
  }

  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-outfit text-[#ffbb00] flex items-center gap-2">
          <Play size={20} /> My Clients
        </h3>
        <button
          onClick={handleToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            enabled ? "bg-[#ffbb00]" : "bg-[#333]"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
              enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        {enabled ? "Section is visible on portfolio" : "Section is hidden from portfolio"}
      </p>

      {/* Add Client Form */}
      <form
        action={async (formData) => {
          await createClient(formData);
          window.location.reload();
        }}
        className="space-y-3 mb-6 border-b border-[#2a2a2a] pb-6"
      >
        <input
          name="channelName"
          required
          placeholder="Channel name..."
          className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00] text-white"
        />
        <input
          name="channelUrl"
          required
          placeholder="YouTube channel URL..."
          className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00] text-white"
        />
        <input
          name="channelImage"
          placeholder="Channel image URL (optional)..."
          className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00] text-white"
        />
        <input
          name="subscribers"
          placeholder="Subscribers (e.g. 1.2M)..."
          className="w-full bg-transparent border border-[#333] rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#ffbb00] text-white"
        />
        <button
          type="submit"
          className="w-full bg-[#ffbb00] text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#ffd24d] transition-colors"
        >
          + Add Client
        </button>
      </form>

      {/* Client List */}
      {clients.length === 0 ? (
        <p className="text-center text-gray-500 text-sm py-4">No clients added yet.</p>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="clients-list">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {clients.map((c, index) => (
                  <Draggable key={c.id} draggableId={c.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="flex items-center gap-3 bg-[#111] border border-[#222] rounded-xl px-3 py-2"
                      >
                        <div {...provided.dragHandleProps} className="text-gray-500 hover:text-white cursor-grab shrink-0">
                          <GripVertical size={16} />
                        </div>
                        {c.channelImage && (
                          <img src={c.channelImage} alt={c.channelName} className="w-8 h-8 rounded-full object-cover shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white font-medium truncate">{c.channelName}</p>
                          {c.subscribers && <p className="text-[10px] text-gray-400">{c.subscribers} subscribers</p>}
                        </div>
                        <form action={deleteClient}>
                          <input type="hidden" name="id" value={c.id} />
                          <button
                            type="submit"
                            onClick={(e) => { if (!confirm("Remove this client?")) e.preventDefault(); }}
                            className="text-red-400 hover:text-red-300 p-1"
                          >
                            <Trash2 size={14} />
                          </button>
                        </form>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}
