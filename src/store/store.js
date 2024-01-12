import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slice/moviesSlice";
import userSlice from "./slice/userSlice";

export const store = configureStore({
    reducer: {
        movies: moviesSlice,
        user : userSlice
    }
})