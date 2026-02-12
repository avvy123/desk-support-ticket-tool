"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchTickets } from "../../../src/store/ticketsSlice";
import { getUser } from "../../../src/utils/auth";

export default function TableDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tickets } = useSelector((state: any) => state.tickets);

  const [user, setUser] = useState<any>(null);

  const users =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("users") || "[]")
      : [];

  useEffect(() => {
    const currentUser = getUser();

    if (!currentUser) {
      router.push("/login");
    } else {
      setUser(currentUser);
      dispatch(fetchTickets() as any);
    }
  }, [dispatch, router]);

  const getUserName = (email: string) => {
    const found = users.find((u: any) => u.email === email);
    return found?.firstName || "Unknown";
  };

  const visibleTickets = tickets.filter(
    (t: any) =>
      t.raisedBy === user?.email ||
      t.assignedTo === user?.email
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        Tickets Table View
      </h1>

      <div className="bg-white shadow rounded-2xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Raised By</th>
              <th className="px-6 py-3">Assigned To</th>
            </tr>
          </thead>

          <tbody className="text-gray-900 text-sm divide-y">
            {visibleTickets.map((ticket: any) => (
              <tr
                key={ticket.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium">
                  {ticket.title}
                </td>

                <td className="px-6 py-4">
                  {ticket.description}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      ticket.status === "open"
                        ? "bg-blue-100 text-blue-700"
                        : ticket.status === "in-progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  {getUserName(ticket.raisedBy)}
                </td>

                <td className="px-6 py-4">
                  {getUserName(ticket.assignedTo)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleTickets.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No tickets available
          </div>
        )}
      </div>
    </div>
  );
}
