import { createSlice } from "@reduxjs/toolkit";

const MealSlice = createSlice({
    name: "meal",
    initialState: {
        data: [],
    },
    reducers: {
        addMeal: (state, action) => {
            state.data = action.payload;
        },
    }
})
export const { addMeal } = MealSlice.actions;
export default MealSlice.reducer;