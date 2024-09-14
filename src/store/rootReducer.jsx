import { combineReducers } from "@reduxjs/toolkit";
import weekOneReducer from './WeekOneSlice';
import weekTwoReducer from './WeekTwoSlice';
import weekThreeReducer from './WeekThreeSlice';
import weekFourReducer from './WeekFourSlice';
import MealReducer from './mealSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";


const persistConfig = {
    key: "root",
    storage
}

const rootReducers = combineReducers({
    meal: MealReducer,
    WeekOne: weekOneReducer,
    WeekTwo: weekTwoReducer,
    WeekThree: weekThreeReducer,
    WeekFour: weekFourReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;