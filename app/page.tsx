"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchTickets, deleteTicket } from "../src/store/ticketsSlice";
import { getUser } from "../src/utils/auth"; // your mock auth utils
import Navbar from "../src/components/Navbar";
import TicketCard from "../src/components/TicketCard";
import SearchBar from "../src/components/SearchBar";
import Filter from "../src/components/Filter";

export default function Dashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tickets, loading, error } = useSelector(state => state.tickets);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [userChecked, setUserChecked] = useState(false);

  // 1️⃣ Check if user is logged in
  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login"); // redirect if not logged in
    } else {
      setUserChecked(true);
      dispatch(fetchTickets());
    }
  }, [dispatch, router]);

  // 2️⃣ Filter tickets
  const filteredTickets = tickets.filter(
    t =>
      t.title.toLowerCase().includes(search.toLowerCase()) &&
      (statusFilter ? t.status === statusFilter : true)
  );

  // 3️⃣ Show loading while checking user
  if (!userChecked)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <img
          src="https://i.gifer.com/ZZ5H.gif"
          alt="Loading..."
          className="w-24 h-24"
        />
      </div>
    );

  // 4️⃣ Render dashboard
  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Tickets Dashboard</h2>
        <SearchBar value={search} onChange={e => setSearch(e.target.value)} />
        <Filter value={statusFilter} onChange={e => setStatusFilter(e.target.value)} />

        {loading && <p>Loading tickets...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTickets.map(ticket => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              onEdit={() => { }}
              onDelete={() => dispatch(deleteTicket(ticket.id))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
