import { createSlice } from "@reduxjs/toolkit";
const WeekThreeSlice = createSlice({
    name: "WeekThree",
    initialState: {
        data: [],
    },
    reducers: {
        addWeekThreeMeal: (state, action) => {
            state.data = action.payload;
        },

        deleteWeekThreeMeal: (state, action) => {
            state.data = state.data.filter((item) => item.id != action.payload)
        },

    }
})
export const { addWeekThreeMeal, deleteWeekThreeMeal } = WeekThreeSlice.actions;
export default WeekThreeSlice.reducer;