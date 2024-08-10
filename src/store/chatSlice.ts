import {createSlice} from "@reduxjs/toolkit";

interface chatSliceProps {
    messages: string[];
}

const initialState: chatSliceProps = {
    messages: [],
}

const chat = createSlice(
    {
        name: 'chat',
        initialState,
        reducers: {
        },
        extraReducers: (builder) => {
        },
        selectors: {
        },
    }
)

export default chat.reducer;