"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

import TicketHeader from "../../../src/components/Tickets/TicketHeader";
import TicketMetaInfo from "../../../src/components/Tickets/TicketMetaInfo";
import TicketDescription from "../../../src/components/Tickets/TicketDescription";
import TicketActivity from "../../../src/components/Tickets/TicketActivity";
import TicketComment from "../../../src/components/Tickets/TicketComment";
import { fetchTickets } from "@/src/store/ticketsSlice";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.tickets);

  const [activeTab, setActiveTab] = useState<"title" | "history" | "comments">("title");

  const ticket = tickets.find((t: any) => t.id === id);

  useEffect(() => {
    if (tickets.length === 0) {
      dispatch(fetchTickets() as any);
    }
  }, [tickets.length, dispatch]);

  if (!ticket) {
    return <div className="p-6">Ticket not found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-200 min-h-screen">
      {/* Back button */}
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeftIcon className="w-4 h-4 text-blue-600" />
        <button className="text-blue-600 cursor-pointer">Back</button>
      </div>

      {/* Tabs / Pills */}
      <div className="flex gap-4 border-b border-gray-300 mb-4">
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "title" ? "text-black bg-white border-t border-l border-r border-gray-300 font-semibold" : "text-black"
          }`}
          onClick={() => setActiveTab("title")}
        >
          Title
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "history" ? "text-black bg-white border-t border-l border-r border-gray-300 font-semibold" : "text-black"
          }`}
          onClick={() => setActiveTab("history")}
        >
          History
        </button>
        <button
          className={`py-2 px-4 rounded-t-lg ${
            activeTab === "comments" ? "text-black bg-white border-t border-l border-r border-gray-300 font-semibold" : "text-black"
          }`}
          onClick={() => setActiveTab("comments")}
        >
          Comments
        </button>
      </div>

      {/* Tab content */}
      <div className="bg-white p-4 rounded-xl shadow">
        {activeTab === "title" && (
          <div className="space-y-6">
            <TicketHeader ticket={ticket} />
            <TicketMetaInfo ticket={ticket} />
            <TicketDescription ticket={ticket} />
          </div>
        )}

        {activeTab === "history" && <TicketActivity ticket={ticket} />}
        {activeTab === "comments" && <TicketComment ticket={ticket} />}
      </div>
    </div>
  );
}
