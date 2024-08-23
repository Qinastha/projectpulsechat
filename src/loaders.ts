import store from "./store";
import {
  getAllUserProjects,
  getCurrentUser,
  getUserData,
} from "./store/chatSlice";

export const userDataLoader = async () => {
  const state = store.getState();
  const user = getCurrentUser(state)!;
  console.log("loader working ");
  if (!user) {
    await store.dispatch(getUserData());
  }

  return store.getState();
};
