"use client";

import React from "react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  editingTicket: any;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newDescription: string;
  setNewDescription: (val: string) => void;
  newStatus: "open" | "in-progress" | "closed";
  setNewStatus: (val: "open" | "in-progress" | "closed") => void;
  priority: "low" | "medium" | "high";
  setPriority: (val: "low" | "medium" | "high") => void;
  assignedTo: string;
  setAssignedTo: (val: string) => void;
  users: any[];
}

export default function CreateTicketModal({
  isOpen,
  onClose,
  onSubmit,
  editingTicket,
  newTitle,
  setNewTitle,
  newDescription,
  setNewDescription,
  newStatus,
  setNewStatus,
  priority,
  setPriority,
  assignedTo,
  setAssignedTo,
  users,
}: TicketModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-gray-900">
          {editingTicket ? "Update Ticket" : "Create Ticket"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 text-gray-900"
            required
          />

          <textarea
            placeholder="Description"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 text-gray-900"
            required
          />

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="w-full border rounded-xl px-4 py-2 text-gray-900"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={newStatus}
            onChange={(e) =>
              setNewStatus(e.target.value as "open" | "in-progress" | "closed")
            }
            className="w-full border rounded-xl px-4 py-2 text-gray-900"
          >
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>

          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="w-full border rounded-xl px-4 py-2 text-gray-900"
            required
          >
            <option value="">Assign To</option>
            {users.map((u: any) => (
              <option key={u.email} value={u.email}>
                {u.firstName}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="px-4 py-2 border rounded-xl text-gray-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-xl"
            >
              {editingTicket ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
