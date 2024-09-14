import { configureStore } from "@reduxjs/toolkit";
import rootReducers from "./rootReducer";
import persistStore from "redux-persist/es/persistStore";

const store = configureStore({
    reducer : rootReducers
})

const persistor = persistStore(store);

export { store, persistor };