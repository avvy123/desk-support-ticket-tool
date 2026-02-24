import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { dummyTickets } from "../utils/mockticket";
import { formatDate, getUserName } from "../utils/commonHelper";

export type ActivityType =
  | "created"
  | "assigned"
  | "status"
  | "priority"
  | "title"
  | "description" ;

export interface Activity {
  type: ActivityType;
  user: string; // email or user id
  message: string;
  time: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: ""| "open" | "in-progress" | "closed";
  priority: "" | "low" | "medium" | "high";
  raisedBy: string;
  assignedTo: string;
  createdAt: string;
  activities?: Activity[];
  currentUser?: string;
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
  search: string;
  filter: "all" | "open" | "in-progress" | "closed";
  editingTicket: Ticket | null;
}

const STORAGE_KEY = "tickets_state";

const loadTicketsFromStorage = (): Ticket[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveTicketsToStorage = (tickets: Ticket[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
};

const initialState: TicketsState = {
  tickets: loadTicketsFromStorage(),
  loading: false,
  error: null,
  search: "",
  filter: "all",
  editingTicket: null,
};

const API_URL = "https://698eb421aded595c25328379.mockapi.io/tickets";

const generateInitialActivities = (ticket: Ticket): Activity[] => {
  const activities: Activity[] = [
    {
      type: "created",
      user: ticket.raisedBy,
      message: `${getUserName(ticket.raisedBy)} created the ticket`,
      time: ticket.createdAt,
    },
  ];

  if (ticket.assignedTo) {
    activities.push({
      type: "assigned",
      user: ticket.raisedBy,
      message: `${getUserName(ticket.raisedBy)} assigned the ticket to ${getUserName(
        ticket.assignedTo
      )}`,
      time: ticket.createdAt,
    });
  }

  activities.push({
    type: "status",
    user: ticket.raisedBy,
    message: `${getUserName(ticket.raisedBy)} changed status to ${ticket.status}`,
    time: ticket.createdAt,
  });

  activities.push({
    type: "priority",
    user: ticket.raisedBy,
    message: `${getUserName(ticket.raisedBy)} changed priority to ${ticket.priority}`,
    time: ticket.createdAt,
  });

  return activities;
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch tickets");

    const data = await res.json();

    return data.map((t: any, index: number) => ({
      id: t.id,
      title: dummyTickets[index]?.title || t.title,
      description: dummyTickets[index]?.description || t.description,
      status: ["open", "in-progress", "closed"].includes(t.status)
        ? t.status
        : "open",
      priority: ["low", "medium", "high"].includes(t.priority)
        ? t.priority
        : "low",
      raisedBy: t.raisedBy,
      assignedTo: t.assignedTo,
      createdAt: new Date(t.createdAt * 1000).toISOString(),
    })) as Ticket[];
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (data: Omit<Ticket, "id" | "createdAt" | "activities">) => {
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
  async ({
    id,
    data,
  }: {
    id: string;
    data: Partial<Ticket>;
  }) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed to update ticket");

    const updatedTicket = await res.json();

    return {
      ...updatedTicket,
    };
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id: string) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
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
    setFilter(state, action: PayloadAction<TicketsState["filter"]>) {
      state.filter = action.payload;
    },
    setEditingTicket(state, action: PayloadAction<Ticket | null>) {
      state.editingTicket = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        if (state.tickets.length > 0) return;

        state.tickets = action.payload.map((ticket) => ({
          ...ticket,
          activities: generateInitialActivities(ticket),
        }));

        saveTicketsToStorage(state.tickets);
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load tickets";
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        const ticket = action.payload;

        state.tickets.push({
          ...ticket,
          activities: generateInitialActivities(ticket),
        });

        saveTicketsToStorage(state.tickets);
      })

      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index === -1) return;

        const oldTicket = state.tickets[index];
        const updatedTicket = action.payload;
        const actor = action.payload.currentUser;
        const now = new Date().toISOString();

        if (updatedTicket.status && updatedTicket.status !== oldTicket.status) {
          oldTicket.activities?.push({
            type: "status",
            user: actor,
            message: `${getUserName(actor)} changed status to ${updatedTicket.status}`,
            time: now,
          });
        }

        if (
          updatedTicket.priority &&
          updatedTicket.priority !== oldTicket.priority
        ) {
          oldTicket.activities?.push({
            type: "priority",
            user: actor,
            message: `${getUserName(actor)} changed priority to ${updatedTicket.priority}`,
            time: now,
          });
        }

        if (
          updatedTicket.assignedTo &&
          updatedTicket.assignedTo !== oldTicket.assignedTo
        ) {
          oldTicket.activities?.push({
            type: "assigned",
            user: actor,
            message: `${getUserName(actor)} assigned the ticket to ${getUserName(
              updatedTicket.assignedTo
            )}`,
            time: now,
          });
        }

        if (updatedTicket.title && updatedTicket.title !== oldTicket.title) {
          oldTicket.activities?.push({
            type: "title",
            user: actor,
            message: `${getUserName(actor)} update the title`,
            time: now,
          });
        }

        if (
          updatedTicket.description &&
          updatedTicket.description !== oldTicket.description
        ) {
          oldTicket.activities?.push({
            type: "description",
            user: actor,
            message: `${getUserName(actor)} updated the description`,
            time: now,
          });
        }

        state.tickets[index] = {
          ...oldTicket,
          ...updatedTicket,
        };

        saveTicketsToStorage(state.tickets);
      })

      .addCase(deleteTicket.fulfilled, (state, action) => {
        state.tickets = state.tickets.filter(
          (t) => t.id !== action.payload
        );
        saveTicketsToStorage(state.tickets);
      });
  },
});

export const { setSearch, setFilter, setEditingTicket } =
  ticketsSlice.actions;

export default ticketsSlice.reducer;