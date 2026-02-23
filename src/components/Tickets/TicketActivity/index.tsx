import { formatDate, getUserName } from "@/src/utils/commonHelper";

type ActivityType = "created" | "assigned" | "status" | "comment" | "closed";

type Activity = {
  type: ActivityType;
  user: string;
  message: string;
  time: string;
};

type Ticket = {
  id: string;
  title: string;
  description: string;
  status: string;
  raisedBy: string;
  assignedTo?: string;
  createdAt: string;
  activities?: Activity[];
};

export default function TicketActivity({ ticket }: { ticket: Ticket }) {
  // Ensure there’s a full activity history
  const activities: Activity[] = ticket.activities || [
    {
      type: "created",
      user: ticket.raisedBy,
      message: `${getUserName(ticket.raisedBy)} created the ticket`,
      time: ticket.createdAt,
    },
    ...(ticket.assignedTo
      ? [
          {
            type: "assigned",
            user: ticket.raisedBy,
            message: `${getUserName(ticket.raisedBy)} assigned the ticket to ${getUserName(ticket.assignedTo)}`,
            time: ticket.createdAt,
          },
        ]
      : []),
    {
      type: "status",
      user: ticket.assignedTo || ticket.raisedBy,
      message: `Status changed to ${ticket.status}`,
      time: ticket.createdAt,
    },
  ];

  // Sort by time ascending
  activities.sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">Activity Timeline</h2>

      <div className="border-l-2 border-gray-300 pl-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-6 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <p className="text-gray-700">{activity.message}</p>
            <p className="text-xs text-gray-400">{formatDate(activity.time)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
