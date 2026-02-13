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
import { getUser } from "../../src/utils/auth";
import TicketCard from "../../src/components/TicketCard";
import Filter from "../../src/components/Filter";
import SearchBar from "../../src/components/SearchBar";
import CreateTicketModal from "@/src/components/Modal/CreateTicketModal";
import {dummyTickets} from "../../src/utils/mockticket";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tickets, loading } = useSelector((state: any) => state.tickets);

  const [search, setSearch] = useState("");
  const [userChecked, setUserChecked] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStatus, setNewStatus] = useState<"open" | "in-progress" | "closed">("open");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");
  const [assignedTo, setAssignedTo] = useState("");
  const [filter, setFilter] = useState("all");

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

  const updatedTickets = tickets.map((ticket: any, index: number) => {
    if (!dummyTickets[index]) return ticket;

    return {
      ...ticket,
      title: dummyTickets[index].title,
      description: dummyTickets[index].description
    };
  });

 const filteredTickets = updatedTickets.filter((t: any) => {
    const isVisible =
      user?.role === "admin"
        ? true
        : t.raisedBy === user?.email || t.assignedTo === user?.email;
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = filter === "all" ? true : t.status === filter;

    return isVisible && matchesSearch && matchesStatus;
  });


  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newDescription || !assignedTo) return;

    if (editingTicket) {
      await dispatch(
        updateTicket({
          id: editingTicket.id,
          data: {
            title: newTitle,
            description: newDescription,
            status: newStatus,
            priority: priority,
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
          priority: priority,
          assignedTo,
          raisedBy: user?.email,
        }) as any
      );
    }

    setIsModalOpen(false);
    setEditingTicket(null);
    setNewTitle("");
    setNewDescription("");
    setNewStatus("open");
    setPriority("low");
    setAssignedTo("");
  };

  const getUserName = (email: string) => {
    const found = users.find((u: any) => u.email === email);
    return found?.firstName || email;
  };

  if (!userChecked) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Tickets Dashboard</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            + Create Ticket
          </button>
        </div>

        <div className="flex gap-4 mb-6">
          <SearchBar value={search} onChange={(e: any) => setSearch(e.target.value)} />
          <Filter value={filter} onChange={(e: any) => setFilter(e.target.value)} />
        </div>

        {loading ? (
          <p className="text-gray-600">Loading tickets...</p>
        ) : filteredTickets.length === 0 ? (
          <p className="text-gray-600">No tickets found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTickets.map((ticket: any) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                raisedByName={getUserName(ticket.raisedBy)}
                assignedToName={getUserName(ticket.assignedTo)}
                currentUserEmail={user?.email}
                onDelete={() => dispatch(deleteTicket(ticket.id) as any)}
                onEdit={() => {
                  setEditingTicket(ticket);
                  setNewTitle(ticket.title);
                  setNewDescription(ticket.description);
                  setNewStatus(ticket.status);
                  setPriority(ticket.priority)
                  setAssignedTo(ticket.assignedTo);
                  setIsModalOpen(true);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTicket(null);
        }}
        onSubmit={handleCreateTicket}
        editingTicket={editingTicket}
        newTitle={newTitle}
        setNewTitle={setNewTitle}
        newDescription={newDescription}
        setNewDescription={setNewDescription}
        newStatus={newStatus}
        setNewStatus={setNewStatus}
        priority={priority}
        setPriority={setPriority}
        assignedTo={assignedTo}
        setAssignedTo={setAssignedTo}
        users={users}
      />
    </div>
  );
}
