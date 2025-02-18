// import { configureStore } from "@reduxjs/toolkit";
// // reducers
// import counterReducer from "./features/counter/counterSlice";
// import uiReducer from "./features/ui/uiSlice";

// export const store = configureStore({
//     reducer: {
//         counter: counterReducer,
//         ui: uiReducer,
//     },
// })


import { configureStore } from "@reduxjs/toolkit";

// // reducers
import counterReducer from "./features/counter/counterSlice";
import uiReducer from "./features/ui/uiSlice";
import { apiSlice } from "./features/api/apiSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        ui: uiReducer,
        [apiSlice.reducerPath]: apiSlice.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware), 
});

export default store;
