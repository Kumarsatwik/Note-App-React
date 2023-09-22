import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./reducer/NotesSlice";

const store = configureStore({
  reducer: {
    notes: notesSlice.reducer,
  },
});

export default store;
