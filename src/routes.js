import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React from "react";
import { PrivateRoute } from "./Components";
import { userDataLoader } from "./loaders";
import { ManageChat } from "./Pages/ManageChat/ManageChat";

const Layout = React.lazy(() => import("./Components/Layout/Layout"));
const Login = React.lazy(() => import("./Pages/Login/Login"));
const Chat = React.lazy(() => import("./Pages/Chat/Chat"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={userDataLoader}
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }>
        <Route path="chat" element={<Chat />} />
        <Route path="chat/create" element={<ManageChat />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>,
  ),
);

export default router;
