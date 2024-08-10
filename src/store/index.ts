import {configureStore} from "@reduxjs/toolkit";
import chat from "./chatSlice"

const store = configureStore({
    reducer: {
        chat,
    }
    }
)

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;