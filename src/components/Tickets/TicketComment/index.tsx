import { getUser } from "@/src/utils/auth";
import { formatDate } from "@/src/utils/commonHelper";
import { useState, useEffect } from "react";

type Comment = {
  name: string;
  text: string;
  time?: string;
  ticketId: string;
};

type Ticket = {
  id: string;
  raisedBy: string;
  assignedTo: string;
  comments?: Comment[];
};

export default function TicketComments({ ticket }: { ticket: Ticket }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const allComments: Comment[] = JSON.parse(
      localStorage.getItem("ticketComments") || "[]"
    );
    const ticketComments = allComments.filter((c) => c.ticketId === ticket.id);

    const currentUser = getUser();
    if (currentUser) {
      const allowedEmails = [ticket.raisedBy, ticket.assignedTo, "admin@example.com"];
      setComments(
        ticketComments.filter((c) => allowedEmails.includes(currentUser.email))
      );
    }
  }, [ticket.id]);

  const handleAddComment = () => {
    const currentUser = getUser();
    if (!currentUser) return;

    const allowedUsers = [ticket.raisedBy, ticket.assignedTo, "admin@example.com"];
    if (!allowedUsers.includes(currentUser.email)) {
      alert("You cannot comment on this ticket.");
      return;
    }

    if (!comment.trim()) return;

    const newComment: Comment = {
      name: currentUser.firstName,
      text: comment,
      time: formatDate(new Date().toISOString()),
      ticketId: ticket.id,
    };

    const updatedComments = [...comments, newComment];
    setComments(updatedComments);
    setComment("");

    const allComments: Comment[] = JSON.parse(
      localStorage.getItem("ticketComments") || "[]"
    );
    localStorage.setItem(
      "ticketComments",
      JSON.stringify([...allComments, newComment])
    );
  };

  const currentUser = getUser();
  const canComment =
    currentUser &&
    [ticket.raisedBy, ticket.assignedTo, "admin@example.com"].includes(currentUser.email);

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-lg font-semibold mb-4 text-black">Comments</h2>

      <div className="space-y-4 mb-4 max-h-80 overflow-y-auto">
        {comments.length === 0 && <p className="text-gray-400 text-center">No comments yet.</p>}
        {comments.map((c, index) => (
          <div key={index} className="bg-gray-100 p-3 rounded-lg">
            <p className="font-semibold text-black">{c.name}</p>
            <p className="text-gray-700">{c.text}</p>
            {c.time && <p className="text-xs text-gray-400">{c.time}</p>}
          </div>
        ))}
      </div>

      {canComment && (
        <div className="flex gap-2">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-lg px-3 py-2 text-black"
          />
          <button
            onClick={handleAddComment}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
}
