import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./ticketsSlice";
import authReducer from "./authSlice"

export const store = configureStore({
    reducer: { 
        tickets: ticketsReducer,
        auth: authReducer
     },
});

export default store;
