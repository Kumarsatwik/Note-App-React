import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupDetails: [],
  selectedNotes: "",
};

const notesSlice = createSlice({
  name: "Notes",
  initialState,
  reducers: {
    addNote(state, action) {
      const { groupId, note } = action.payload;
      // console.log(groupId, note);
      const findNote = state.groupDetails.find((group) => group.id === groupId);
      if (findNote) {
        const currentTime = new Date();
        const timeStamp = currentTime.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          day: "numeric",
          month: "long",
          year: "numeric",
        });
        findNote["notes"].push({ timeStamp, message: note });
      }
    },
    addNoteName(state, action) {
      // console.log(action.payload);
      const { name, color } = action.payload;
      state.groupDetails.push({
        groupName: name,
        color: color,
        notes: [],
        id: Date.now(),
      });
    },
    selectNote(state, action) {
      const { selected } = action.payload;
      state.selectedNotes = selected;
      // console.log(state.selectedNotes); //undefined
    },
  },
});
export const { selectNote, addNoteName, addNote } = notesSlice.actions;
export default notesSlice;
