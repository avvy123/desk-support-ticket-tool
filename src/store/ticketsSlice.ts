import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "closed";
  raisedBy: string;
  assignedTo: string;
}

const getCurrentUserEmail = () => {
  if (typeof window === "undefined") return null;

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  return user?.email || "unknown@gmail.com";
};


const initialTickets: Ticket[] = [
  {
    id: "1",
    title: "Login Issue",
    description: "Cannot login to dashboard fwww",
    status: "open",
    raisedBy: getCurrentUserEmail(),
    assignedTo: "ravi@gmail.com",
  },
  {
    id: "2",
    title: "Payment Issue",
    description: "Payment not processed",
    status: "open",
    raisedBy: getCurrentUserEmail(),
    assignedTo: "mohan@gmail.com",
  },
  {
    id: "3",
    title: "Production Issue",
    description: "Production page is not loading",
    status: "open",
    raisedBy: getCurrentUserEmail(),
    assignedTo: "unknown@gmail.com",
  },
  {
    id: "4",
    title: "Laptop Issue",
    description: "Laptop is not working",
    status: "in-progress",
    raisedBy: getCurrentUserEmail(),
    assignedTo: "unkown@gmail.com",
  },{
    id: "5",
    title: "Laptop battery issue",
    description: "Battery drainage very fastly",
    status: "in-progress",
    raisedBy: getCurrentUserEmail(),
    assignedTo: "unknown@gmail.com",
  }
];

const getTicketsFromStorage = (): Ticket[] => {
  const stored = localStorage.getItem("tickets");
  
  // If no tickets in storage or a reset flag is true, use initialTickets
  if (!stored || localStorage.getItem("resetTickets") === "true") {
    localStorage.setItem("tickets", JSON.stringify(initialTickets));
    localStorage.removeItem("resetTickets");
    return initialTickets;
  }

  return JSON.parse(stored);
};

const saveTicketsToStorage = (tickets: Ticket[]) => {
  localStorage.setItem("tickets", JSON.stringify(tickets));
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => getTicketsFromStorage()
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (data: {
    title: string;
    description: string;
    status: "open" | "in-progress" | "closed";
    assignedTo: string;
  }) => {
    const tickets = getTicketsFromStorage();
    const currentUser = JSON.parse(
      localStorage.getItem("currentUser") || "null"
    );

    if (!currentUser) throw new Error("User not logged in");

    const newTicket: Ticket = {
      id: Date.now().toString(),
      title: data.title,
      description: data.description,
      status: data.status,
      raisedBy: currentUser.email,
      assignedTo: data.assignedTo,
    };

    tickets.push(newTicket);
    saveTicketsToStorage(tickets);

    return newTicket;
  }
);

export const updateTicket = createAsyncThunk(
  "tickets/updateTicket",
  async ({ id, data }: { id: string; data: Partial<Ticket> }) => {
    const tickets = getTicketsFromStorage();

    const updatedTickets = tickets.map((t) =>
      t.id === id ? { ...t, ...data } : t
    );

    saveTicketsToStorage(updatedTickets);

    return updatedTickets.find((t) => t.id === id);
  }
);

export const deleteTicket = createAsyncThunk(
  "tickets/deleteTicket",
  async (id: string) => {
    const tickets = getTicketsFromStorage();
    const remaining = tickets.filter((t) => t.id !== id);
    saveTicketsToStorage(remaining);
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
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
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
        state.tickets = state.tickets.filter(
          (t) => t.id !== action.payload
        );
      });
  },
});

export default ticketsSlice.reducer;
