import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IChat} from "../core/interfaces/IChat";

interface chatSliceProps {
    currentChat: IChat
    chats: IChat[]
    status: "idle" | "loading" | "resolved" | "rejected";
}

const initialState: chatSliceProps = {
    currentChat: {
        _id: '',
        messages: [],
        members: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        avatar: '',
        name: '',
        description: '',
        currentProject: {
            _id: '',
            projectName: '',
            projectDescription: '',
            projectAvatar: '',
            members: [],
            isCompleted: false,
        },
    },
    chats: [],
    status: 'idle',
}

const chat = createSlice(
    {
        name: 'chat',
        initialState,
        reducers: {
            setCurrentChat: (state, action: PayloadAction<string | null>) => {
                const chat = state.chats.find(
                    chat => chat._id === action.payload,
                );
                if (chat) {
                    state.currentChat = chat as IChat;
                }
            },
        },
        selectors: {

        },
        extraReducers: (builder) => {

        },
    }
)

export default chat.reducer;