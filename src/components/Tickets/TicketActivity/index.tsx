export default function TicketActivity() {
  const activities = [
    "Ticket created",
    "Assigned to Admin",
    "Status changed to In Progress"
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">Activity Timeline</h2>

      <div className="border-l-2 border-gray-300 pl-4 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-6 top-1 w-3 h-3 bg-blue-500 rounded-full"></div>
            <p className="text-gray-700">{activity}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
