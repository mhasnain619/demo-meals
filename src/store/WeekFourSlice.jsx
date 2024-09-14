import { createSlice } from "@reduxjs/toolkit";
const WeekFourSlice = createSlice({
    name: "WeekFour",
    initialState: {
        data: [],
    },
    reducers: {
        addWeekFourMeal: (state, action) => {
            state.data = action.payload;
        },

        deleteWeekFourMeal: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload)
        },

    }
})
export const { addWeekFourMeal, deleteWeekFourMeal } = WeekFourSlice.actions;
export default WeekFourSlice.reducer;