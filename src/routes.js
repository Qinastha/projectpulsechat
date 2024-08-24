import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import React, { Suspense } from "react";
import { PrivateRoute } from "./Components";
import { userDataLoader } from "./loaders";
import ManageChat from "./Pages/ManageChat/ManageChat";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";
import {LogoLoader} from "@Qinastha/pulse_library";

const Layout = React.lazy(() => import("./Components/Layout/Layout"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        loader={userDataLoader}
        element={
          <PrivateRoute>
            <Suspense fallback={<LogoLoader/>}>
              <Layout />
            </Suspense>
          </PrivateRoute>
        }>
        <Route path="chat/create" element={<ManageChat mode="create" />} />
        <Route path="chat/:chatId" element={<Chat />} />
        <Route
          path="chat/:chatId/edit"
          element={<ManageChat mode="update" />}
        />
      </Route>

      <Route path="login" element={<Login />} />
    </Route>,
  ),
);

export default router;
