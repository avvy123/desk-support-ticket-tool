import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { dummyTickets } from "../utils/mockticket";
import { formatDate } from "../utils/commonHelper";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "" | "open" | "in-progress" | "closed";
  priority: "" | "low" | "medium" | "high";
  raisedBy: string;
  assignedTo: string;
  createdAt: string;
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  search: string;
  filter: "all" | "open" | "in-progress" | "closed";
  editingTicket: Ticket | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
  search: "",
  filter: "all",
  editingTicket: null,
};

const API_URL = "https://698eb421aded595c25328379.mockapi.io/tickets";

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch tickets");

    const data = await res.json();

    return data.map((t: any, index: number) => ({
      ...t,
      title: dummyTickets[index]?.title || t.title,
      description: dummyTickets[index]?.description || t.description,
      status: ["open", "in-progress", "closed"].includes(t.status)
        ? t.status
        : "open",
      priority: ["low", "medium", "high"].includes(t.priority)
        ? t.priority
        : "low",
      createdAt: formatDate(new Date(t.createdAt * 1000).toISOString())
    }));
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (data: Omit<Ticket, "id" | "createdAt">) => {
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
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete ticket");
    return id;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setFilter(
      state,
      action: PayloadAction<TicketsState["filter"]>
    ) {
      state.filter = action.payload;
    },
    setEditingTicket(
      state,
      action: PayloadAction<Ticket | null>
    ) {
      state.editingTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch tickets";
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      })
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index === -1) return;

        const updatedTicket = action.payload;

        state.tickets[index] = {
          ...state.tickets[index],
          ...updatedTicket,
          createdAt: typeof updatedTicket.createdAt === "number"
            ? formatDate(new Date(updatedTicket.createdAt * 1000).toISOString())
            : updatedTicket.createdAt,
        };
      })
      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export const {
  setSearch,
  setFilter,
  setEditingTicket,
} = ticketsSlice.actions;

export default ticketsSlice.reducer;