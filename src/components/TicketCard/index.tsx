"use client";

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
        return "bg-blue-100 text-blue-700";
      case "in-progress":
        return "bg-yellow-100 text-yellow-700";
      case "closed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const canModify =
    ticket.raisedBy === currentUserEmail ||
    ticket.assignedTo === currentUserEmail;

  return (
    <div className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg text-gray-900">
          {ticket.title}
        </h3>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusBadge(
            ticket.status
          )}`}
        >
          {ticket.status}
        </span>
      </div>

      <p className="text-gray-700 mb-3">
        {ticket.description}
      </p>

      <div className="text-sm text-gray-600 space-y-1">
        <p>
          <span className="font-medium">Raised By:</span>{" "}
          {raisedByName}
        </p>
        <p>
          <span className="font-medium">Assigned To:</span>{" "}
          {assignedToName}
        </p>
      </div>

      {canModify && (
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onEdit}
            className="text-blue-600 text-sm font-medium"
          >
            Update
          </button>

          <button
            onClick={onDelete}
            className="text-red-500 text-sm font-medium"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
