import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import React from "react";
import {PrivateRoute} from "./Components";

const Layout = React.lazy(() => import("./Components/Layout/Layout"))
const Login = React.lazy(()=> import("./Pages/Login/Login"))
const Chat = React.lazy(()=> import("./Pages/Chat/Chat"))

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route  path="/" element={
                <PrivateRoute>
                    <Layout />
                </PrivateRoute>
            }>
                <Route index path="/chat" element={<Chat />} />
            </Route>
            <Route  path="/login" element={<Login />} />
        </Route>
    )
)

export default router;