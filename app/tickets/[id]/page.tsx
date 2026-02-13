"use client";

import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import TicketHeader from "../../../src/components/Tickets/TicketHeader";
import TicketMetaInfo from "../../../src/components/Tickets/TicketMetaInfo";
import TicketDescription from "../../../src/components/Tickets/TicketDescription";
import TicketActivity from "../../../src/components/Tickets/TicketActivity";
import TicketComment from "../../../src/components/Tickets/TicketComment";
import { useEffect } from "react";
import { fetchTickets } from "@/src/store/ticketsSlice";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function TicketDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { tickets } = useSelector((state: any) => state.tickets);

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
    <div className="max-w-5xl mx-auto p-6 space-y-6 bg-gray-200">
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4 h-4 text-blue-600" />
            <button
                className="text-blue-600 cursor-pointer"
            >
                Back
            </button>
        </div>

     <div className="flex flex-col gap-2 h-100 min-h-screen overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-400">
         <TicketHeader ticket={ticket} />
        <TicketMetaInfo ticket={ticket} />
        <TicketDescription ticket={ticket} />
        <TicketActivity />
        <TicketComment />
     </div>
    </div>
  );
}
