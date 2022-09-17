import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import unitReducer from "./unitSlice";

const store = configureStore({
    reducer: {
        theme: themeReducer,
        unit: unitReducer,
    }
})

export default store;