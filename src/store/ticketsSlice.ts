import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dummyTickets } from "../utils/mockticket";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  priority: "low" | "medium" | "high";
  raisedBy: string;
  assignedTo: string;
  createdAt: string;
}

const API_URL = "https://698eb421aded595c25328379.mockapi.io/tickets";

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const normalizeTickets = (ticketsFromApi: any[]) => {
  const statusMap: Ticket["status"][] = ["open", "in-progress", "closed"];
  const priorityMap: ("low" | "medium" | "high")[] = ["low", "medium", "high"];
  return ticketsFromApi.map((t: any, index: number) => ({
    ...t,
    status: statusMap.includes(t.status) ? t.status : "open",
    priority: priorityMap.includes(t.priority) ? t.priority : "low",
    createdAt: formatDate(new Date(t.createdAt * 1000).toISOString())
  }));
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch tickets");
    const data = await res.json();
    return normalizeTickets(data);
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (data: {
    title: string;
    description: string;
    status: "open" | "in-progress" | "closed";
    priority: "low" | "medium" | "high";
    assignedTo: string;
    raisedBy: string;
  }) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create ticket");
    return (await res.json()) as Ticket;
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ id, data }: { id: string; data: Partial<Ticket> }) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update ticket");
    return (await res.json()) as Ticket;
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id: string) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete ticket");
    return id;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [] as Ticket[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
      state.loading = false;

      state.tickets = action.payload.map((ticket: any, index: number) => ({
        ...ticket,
        title: dummyTickets[index]?.title || ticket.title,
        description:
          dummyTickets[index]?.description || ticket.description,
      }))
    })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tickets";
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        if (!action.payload) return;
        state.tickets = state.tickets.map((t) =>
          t.id === action.payload!.id ? action.payload! : t
        );
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter((t) => t.id !== action.payload);
      });
  },
});

export default ticketsSlice.reducer;
