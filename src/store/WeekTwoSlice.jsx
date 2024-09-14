import { createSlice } from "@reduxjs/toolkit";
const WeekTwoSlice = createSlice({
    name: "WeekTwo",
    initialState: {
        data: [],
    },
    reducers: {
        addWeekTwoMeal: (state, action) => {
            state.data = action.payload;
        },

        deleteWeekTwoMeal: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload)
        },

    }
})
export const { addWeekTwoMeal, deleteWeekTwoMeal, } = WeekTwoSlice.actions;
export default WeekTwoSlice.reducer;