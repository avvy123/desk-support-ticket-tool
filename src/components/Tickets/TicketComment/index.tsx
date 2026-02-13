import { useState } from "react";

export default function TicketComments() {
  const [comment, setComment] = useState("");

  const comments = [
    { name: "Aman", text: "Issue started yesterday." },
    { name: "Admin", text: "We are investigating this issue." }
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">Comments</h2>

      <div className="space-y-4 mb-4">
        {comments.map((c, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-black">{c.name}</p>
            <p className="text-gray-700">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border rounded-lg px-3 py-2 text-black"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
}
