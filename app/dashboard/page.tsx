"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  fetchTickets,
  deleteTicket,
  createTicket,
  updateTicket,
} from "../../src/store/ticketsSlice";
import { getUser, logout } from "../../src/utils/auth";
import TicketCard from "../../src/components/TicketCard";
import Navbar from "@/src/components/Navbar";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tickets } = useSelector((state: any) => state.tickets);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userChecked, setUserChecked] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState<
    "open" | "in-progress" | "closed"
  >("open");
  const [assignedTo, setAssignedTo] = useState("");

  const users =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("users") || "[]")
      : [];

  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
      setUserChecked(true);
      dispatch(fetchTickets() as any);
    }
  }, [dispatch, router]);

  /* ================= FILTER ================= */

  const filteredTickets = tickets.filter((t: any) => {
    const isVisible =
      t.raisedBy === user?.email ||
      t.assignedTo === user?.email;

    const matchesSearch = t.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = statusFilter
      ? t.status === statusFilter
      : true;

    return isVisible && matchesSearch && matchesStatus;
  });

  /* ================= CREATE / UPDATE ================= */

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTitle || !newDescription || !assignedTo)
      return;

    if (editingTicket) {
      await dispatch(
        updateTicket({
          id: editingTicket.id,
          data: {
            title: newTitle,
            description: newDescription,
            status: newStatus,
            assignedTo,
          },
        }) as any
      );
    } else {
      await dispatch(
        createTicket({
          title: newTitle,
          description: newDescription,
          status: newStatus,
          assignedTo,
        }) as any
      );
    }

    setIsModalOpen(false);
    setEditingTicket(null);
    setNewTitle("");
    setNewDescription("");
    setNewStatus("open");
    setAssignedTo("");
  };

  const getUserName = (email: string) => {
    const found = users.find((u: any) => u.email === email);
    return found?.firstName || "Dummy raiser";
  };

  if (!userChecked) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        userName={user?.firstName}
        onLogout={() => {
          logout();
          router.push("/login");
        }}
      />

      <div className="p-6">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Tickets Dashboard
          </h2>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            + Create Ticket
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 border rounded-xl px-4 py-2 text-gray-900"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-xl px-4 py-2 text-gray-900"
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in-progress">
              In Progress
            </option>
            <option value="closed">Closed</option>
          </select>
        </div>

        {/* TICKETS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTickets.map((ticket: any) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              raisedByName={getUserName(ticket.raisedBy)}
              assignedToName={getUserName(ticket.assignedTo)}
              currentUserEmail={user?.email}
              onDelete={() =>
                dispatch(deleteTicket(ticket.id) as any)
              }
              onEdit={() => {
                setEditingTicket(ticket);
                setNewTitle(ticket.title);
                setNewDescription(ticket.description);
                setNewStatus(ticket.status);
                setAssignedTo(ticket.assignedTo);
                setIsModalOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">
              {editingTicket
                ? "Update Ticket"
                : "Create Ticket"}
            </h3>

            <form
              onSubmit={handleCreateTicket}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Title"
                value={newTitle}
                onChange={(e) =>
                  setNewTitle(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-2 text-gray-900"
                required
              />

              <textarea
                placeholder="Description"
                value={newDescription}
                onChange={(e) =>
                  setNewDescription(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-2 text-gray-900"
                required
              />

              <select
                value={newStatus}
                onChange={(e) =>
                  setNewStatus(
                    e.target.value as
                      | "open"
                      | "in-progress"
                      | "closed"
                  )
                }
                className="w-full border rounded-xl px-4 py-2 text-gray-900"
              >
                <option value="open">Open</option>
                <option value="in-progress">
                  In Progress
                </option>
                <option value="closed">Closed</option>
              </select>

              <select
                value={assignedTo}
                onChange={(e) =>
                  setAssignedTo(e.target.value)
                }
                className="w-full border rounded-xl px-4 py-2 text-gray-900"
                required
              >
                <option value="">Assign To</option>
                {users.map((u: any) => (
                  <option
                    key={u.email}
                    value={u.email}
                  >
                    {u.firstName}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTicket(null);
                  }}
                  className="px-4 py-2 border rounded-xl text-gray-700"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl"
                >
                  {editingTicket
                    ? "Update"
                    : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
