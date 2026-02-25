"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "../../store";
import { useEffect } from "react";
import { getUser } from "@/src/utils/auth";
import { setUser, clearUser } from "@/src/store/authSlice";
import Navbar from "../Navbar";
import Loader from "@/src/components/Loader";
import { hydrateTickets } from "@/src/store/ticketsSlice";

function AuthHydrator({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const authChecked = useSelector((state: any) => state.auth.authChecked);

  useEffect(() => {
    const user = getUser();
    if (user) {
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
    if (typeof window !== "undefined") {
    const rawTickets = localStorage.getItem("tickets_state");
    if (rawTickets) {
      dispatch(hydrateTickets(JSON.parse(rawTickets)));
    }
  }
  }, [dispatch]);

  if (!authChecked) {
    return <Loader message="Checking session..." />;
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default function ProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHydrator>{children}</AuthHydrator>
    </Provider>
  );
}