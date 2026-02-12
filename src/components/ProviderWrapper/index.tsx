"use client";
import { Provider } from "react-redux";
import { store } from "../../store";
import Navbar from "../Navbar";
import { getUser } from "@/src/utils/auth";

export default function ProviderWrapper({ children }: { children: React.ReactNode }) {
    const currentUser = getUser();
    return <Provider store={store}>
            {currentUser && <Navbar />}
            {children}
        </Provider>;
}
