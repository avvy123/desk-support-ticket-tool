import { formatStatus, getPriorityBadge, getStatusBadge } from "@/src/utils/commonHelper";

export default function TicketHeader({ ticket }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-3 text-black">{ticket.title}</h1>

      <div className="flex gap-3">
        <span className={`px-3 py-1 text-sm rounded-full ${getStatusBadge(ticket.status)}`}>
            {formatStatus(ticket.status)}
        </span>

        <span className={`px-3 py-1 text-sm rounded-full ${getPriorityBadge(ticket.priority)}`}>
          {formatStatus(ticket.priority)}
        </span>
      </div>
    </div>
  );
}
