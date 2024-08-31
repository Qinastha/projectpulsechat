import store from "./store";
import {
  getAllUserProjects,
  getCurrentUser,
  getUserData,
} from "./store/chatSlice";

export const userDataLoader = async () => {
  const state = store.getState();
  const user = getCurrentUser(state)!;
  if (!user) {
    await store.dispatch(getUserData());
  }

  return store.getState();
};
