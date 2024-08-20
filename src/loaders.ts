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

    const updatedState = store.getState();
    const updatedUser = getCurrentUser(updatedState)!;

    if (updatedUser) {
      await store.dispatch(getAllUserProjects());
    } else {
      console.error("User data could not be retrieved.");
    }
  } else {
    await store.dispatch(getAllUserProjects());
  }

  return store.getState();
};
