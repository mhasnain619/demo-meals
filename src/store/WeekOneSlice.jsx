import { createSlice } from "@reduxjs/toolkit";
const WeekOneSlice = createSlice({
    name: "WeekOne",
    initialState: {
        data: [],
    },
    reducers: {
        addWeekOneMeal: (state, action) => {
            state.data = action.payload;
        },

        deleteWeekOneMeal: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload)
        },

    }
})
export const { addWeekOneMeal, deleteWeekOneMeal } = WeekOneSlice.actions;
export default WeekOneSlice.reducer;