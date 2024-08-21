import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IChat, IMember, IProject } from "../core";

interface chatSliceProps {
  currentChat: IChat | null;
  userProjects: IProject[];
  currentUser: IMember | null;
  selectedProject: IProject | null;
  status: "idle" | "loading" | "resolved" | "rejected";
}

const initialState: chatSliceProps = {
  currentChat: {
    _id: "",
    messages: [],
    members: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    avatar: "",
    name: "",
    description: "",
    currentProject: {
      _id: "",
      projectName: "",
      projectDescription: "",
      projectAvatar: "",
      members: [],
      isCompleted: false,
      chats: [],
    },
  },
  userProjects: [],
  currentUser: null,
  selectedProject: null,
  status: "idle",
};

export const getUserData = createAsyncThunk("chat/getUserData", async () => {
  const token = localStorage.getItem("token")!;
  try {
    const response = await axios.get("http://localhost:4000/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    if (response.data?.value) {
      return response.data.value as IMember;
    }
    throw new Error("Failed to fetch user data.");
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
});

export const getAllUserProjects = createAsyncThunk(
  "chat/getAllMemberProjects",
  async () => {
    const token = localStorage.getItem("token")!;
    try {
      const response = await axios.get(
        "http://localhost:4000/api/project/currentProjects",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        },
      );
      if (response.data?.value) {
        return response.data.value as IProject[];
      }
      throw new Error("Failed to fetch projects.");
    } catch (error) {
      console.error("Error fetching project:", error);
      throw error;
    }
  },
);

export const deleteChat = createAsyncThunk(
    "chat/deleteChat",
    async (chatId: string) => {
      const token = localStorage.getItem("token")!;
      try {
        await axios.delete(`http://localhost:4000/api/chat/${chatId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        return chatId;
      } catch (error) {
        console.error("Error deleting chat:", error);
        throw error;
      }
    }
  );


const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string | null>) => {
      const project = state.userProjects.find(
        project => project._id === action.payload,
      );
      if (project) {
        state.selectedProject = project as IProject;
      }
    },
    setCurrentChat: (state, action: PayloadAction<string | null>) => {
      const chat = state.selectedProject!.chats.find(
        chat => chat._id === action.payload,
      );
      if (chat) {
        state.currentChat = chat as IChat;
      }
    },
    setCurrentChatNull: (state) => {
      state.currentChat = null;
    },
  },
  selectors: {
    getCurrentChat: state => state.currentChat,
    getSelectedProject: state => state.selectedProject,
    getSelectedProjectsMembers: state => state.selectedProject?.members,
    getAllProjects: state => state.userProjects,
    getCurrentUser: state => state.currentUser,
  },
  extraReducers: builder => {
      builder.addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<IMember>) => {
          state.currentUser = action.payload;
        });

      builder.addCase(
        getAllUserProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.userProjects = action.payload;
          state.status = "resolved";
        });

      builder.addCase(deleteChat.fulfilled,
        (state, action: PayloadAction<string>) => {
        const chatId = action.payload
          state.selectedProject!.chats = state.selectedProject!.chats.filter(
            chat => chat._id!== chatId,
          );
          state.currentChat = null;
        });
  },
});

export const { setSelectedProject,
  setCurrentChat,
  setCurrentChatNull,} = chat.actions;

export const {
  getCurrentChat,
  getAllProjects,
  getSelectedProject,
  getSelectedProjectsMembers,
  getCurrentUser,
} = chat.selectors;

export default chat.reducer;
