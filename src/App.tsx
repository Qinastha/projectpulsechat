import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import '@Qinastha/pulse_library/dist/index.css'

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
