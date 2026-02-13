import { getUserName } from "@/src/utils/getUsername";

export default function TicketMetaInfo({ ticket }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow grid grid-cols-2 gap-6">
      <div>
        <p className="text-gray-500 text-sm">Raised By</p>
        <p className="font-bold text-black">{getUserName(ticket.raisedBy)}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Assigned To</p>
        <p className="font-bold text-black">{getUserName(ticket.assignedTo)}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Created At</p>
        <p className="font-bold text-black">{ticket.createdAt}</p>
      </div>

      <div>
        <p className="text-gray-500 text-sm">Ticket ID</p>
        <p className="font-bold text-black">{ticket.id}</p>
      </div>
    </div>
  );
}
