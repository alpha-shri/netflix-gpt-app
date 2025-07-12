import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/reducers/userSlice";
import moviesReducer from "@/reducers/movieSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default appStore;
