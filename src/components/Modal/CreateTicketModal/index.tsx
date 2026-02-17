"use client";

import React from "react";

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => void;
  editingTicket: any;
  newTitle: string;
  setNewTitle: (val: string) => void;
  newDescription: string;
  setNewDescription: (val: string) => void;
  newStatus: "" | "open" | "in-progress" | "closed";
  setNewStatus: (val: "open" | "in-progress" | "closed") => void;
  priority: "" | "low" | "medium" | "high";
  setPriority: (val: "" | "low" | "medium" | "high") => void;
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
        <h3 className="text-xl font-semibold mb-6 text-gray-900">
          {editingTicket ? "Update Ticket" : "Create Ticket"}
        </h3>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder=" "
              required
              className="peer w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            />
            <label
              className="absolute left-4 bg-white px-1 text-gray-500 transition-all
                top-3.5
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
                peer-focus:text-gray-500
                peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:text-sm"
            >
              Title
            </label>
          </div>

          <div className="relative">
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              placeholder=" "
              required
              className="peer w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            />
            <label
              className="absolute left-4 bg-white px-1 text-gray-500 transition-all
                top-3.5
                peer-placeholder-shown:top-3.5
                peer-placeholder-shown:text-base
                peer-focus:-top-2
                peer-focus:text-sm
                peer-not-placeholder-shown:-top-2
                peer-not-placeholder-shown:text-sm"
            >
              Description
            </label>
          </div>

          <div className="relative">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as any)}
              className="peer w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            >
              <option value="" disabled hidden>Select Priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <label className="absolute left-4 -top-2 text-sm bg-white px-1 text-gray-500">
              Priority
            </label>
          </div>

          <div className="relative">
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as any)}
              className="peer w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            >
              <option value="" disabled hidden>Select Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
            <label className="absolute left-4 -top-2 text-sm bg-white px-1 text-gray-500">
              Status
            </label>
          </div>

          <div className="relative">
            <select
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              required
              className="peer w-full border rounded-xl px-4 py-3 text-gray-900 focus:outline-none"
            >
              <option value="" disabled hidden>Select Assignee</option>
              {users.map((u: any) => (
                <option key={u.email} value={u.email}>
                  {u.firstName}
                </option>
              ))}
            </select>
            <label className="absolute left-4 -top-2 text-sm bg-white px-1 text-gray-500">
              Assign To
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
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
