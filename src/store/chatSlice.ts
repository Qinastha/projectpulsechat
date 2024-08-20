import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IChat, IMember, IProject } from "../core";

interface chatSliceProps {
  currentChat: IChat;
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

const chat = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string | null>) => {
      const project = state.userProjects.find(
        project => project._id === action.payload,
      );
      if (project) {
        state.selectedProject = project;
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
  },
  selectors: {
    getCurrentChat: state => state.currentChat,
    getSelectedProject: state => state.selectedProject,
    getAllProjects: state => state.userProjects,
    getCurrentUser: state => state.currentUser,
    getStatus: state => state.status,
  },
  extraReducers: builder => {
    builder

      .addCase(
        getUserData.fulfilled,
        (state, action: PayloadAction<IMember>) => {
          state.currentUser = action.payload;
        },
      )

      .addCase(getAllUserProjects.pending, state => {
        state.status = "loading";
      })
      .addCase(
        getAllUserProjects.fulfilled,
        (state, action: PayloadAction<IProject[]>) => {
          state.userProjects = action.payload;
          state.status = "resolved";
        },
      )
      .addCase(getAllUserProjects.rejected, (state, action) => {
        state.status = "rejected";
        console.error("Fetching member projects failed:", action.error.message);
      });
  },
});

export const { setSelectedProject, setCurrentChat } = chat.actions;

export const {
  getCurrentChat,
  getAllProjects,
  getSelectedProject,
  getCurrentUser,
  getStatus,
} = chat.selectors;

export default chat.reducer;
