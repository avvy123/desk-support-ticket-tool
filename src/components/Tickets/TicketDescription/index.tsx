export default function TicketDescription({ ticket }: any) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-3 text-black">Description</h2>
      <p className="text-gray-700 leading-relaxed">
        {ticket.description}
      </p>
    </div>
  );
}
