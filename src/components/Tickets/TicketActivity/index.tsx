import { formatDate } from "@/src/utils/commonHelper";

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
  const activities: Activity[] = ticket.activities ?? [];

  const sortedActivities = [...activities]

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">
        Activity Timeline
      </h2>

      {sortedActivities.length === 0 ? (
        <p className="text-sm text-gray-400">No activity yet</p>
      ) : (
        <div className="border-l-2 border-gray-300 pl-4 space-y-4">
          {sortedActivities.map((activity, index) => (
            <div key={index} className="relative">
              <div className="absolute -left-6 top-1 w-3 h-3 bg-blue-500 rounded-full" />
              <p className="text-gray-700">{activity.message}</p>
              <p className="text-xs text-gray-400">
                {formatDate(activity.time)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}