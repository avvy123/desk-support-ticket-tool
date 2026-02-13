"use client";

import { getUser } from "@/src/utils/auth";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

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
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-600 text-white";
      case "in-progress":
        return "bg-yellow-700 text-white";
      case "closed":
        return "bg-green-600 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const currentUser = getUser();

  const canModify =
    ticket.raisedBy === currentUserEmail ||
    ticket.assignedTo === currentUserEmail || currentUser.role === "admin";

  return (
    <div className="flex flex-col gap-1 bg-white rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center px-3 py-4">
        <p
        className={`px-3 py-1 rounded-full font-medium text-sm ${
        ticket.priority === "low" ? "bg-green-600 text-white text-center" :
        ticket.priority === "medium" ? "bg-yellow-600 text-white" :
        "bg-red-600 text-white"
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
      <div className="px-3 py-4 border-t-1">
        <h3 className="font-semibold text-lg text-gray-900">
          {ticket.title}
        </h3>

        <p className="text-gray-700">
          {ticket.description}
        </p>
      </div>
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
