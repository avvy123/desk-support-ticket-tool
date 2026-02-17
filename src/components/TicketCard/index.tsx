"use client";

import { getUser } from "@/src/utils/auth";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { getStatusBadge } from "@/src/utils/statusColor";
import { getPriorityBadge } from "@/src/utils/priorityBadge";
import { formatStatus } from "@/src/utils/formatStatusText";

interface Props {
  ticket: any;
  raisedByName: string;
  assignedToName: string;
  currentUserEmail: string;
  onDelete: () => void;
  onEdit: () => void;
}

export default function TicketCard({
  ticket,
  raisedByName,
  assignedToName,
  currentUserEmail,
  onDelete,
  onEdit,
}: Props) {

  const currentUser = getUser();
  const router = useRouter();
  const handleTicketClick = () => {
    router.push(`/tickets/${ticket.id}`)
  }

  const canModify =
    ticket.raisedBy === currentUserEmail ||
    ticket.assignedTo === currentUserEmail || currentUser.role === "admin";

  return (
    <div className="flex flex-col gap-1 bg-white rounded-2xl shadow hover:shadow-lg transition border-1 border-gray-400">
      <div className="flex justify-between items-center px-3 py-4" onClick={handleTicketClick}>
        <p
        className={`px-3 py-1 rounded-full font-medium text-sm ${
        getPriorityBadge(ticket.priority)
        }`}
      >
        {formatStatus(ticket.priority)}
      </p>

        <span
          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(
            ticket.status
          )}`}
        >
          {formatStatus(ticket.status)}
        </span>
      </div>
      <h3 className="font-semibold pl-3 py-4 pt-0 text-lg text-gray-900 border-b-1 border-black">
        {ticket.title}
      </h3>

      <p className="text-gray-700 pl-3 py-4 pt-0">
        {ticket.description}
      </p>
      <div className="flex items-center justify-between px-3 py-4 text-sm text-gray-600 border-t-1">
       <div>
         <p>
          <span className="font-medium">Raised By:</span>{" "}
          <span className="font-bold text-black">{raisedByName}</span>
        </p>
        <p>
          <span className="font-medium">Assigned To:</span>{" "}
          <span className="font-bold text-black">{assignedToName}</span>
        </p>
        <p>
        <span className="font-medium">Created:</span>{" "}
        <span className="font-bold text-black">{ticket.createdAt}</span>
      </p>
       </div>
      {canModify && (
        <div className="flex justify-end gap-3">
          <button
            onClick={onEdit}
          >
            <PencilSquareIcon className="w-5 h-5 text-blue-600 cursor-pointer" />
          </button>

          <button
            onClick={onDelete}
          >
           <TrashIcon className="w-5 h-5 text-red-600 cursor-pointer" />
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
