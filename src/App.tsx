import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import "./i18n";

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
