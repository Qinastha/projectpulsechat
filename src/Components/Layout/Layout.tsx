import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChatNavbar } from "../ChatNavbar/ChatNavbar";
import { ProjectSelect } from "../ProjectSelect/ProjectSelect";
import "./Layout.scss";
import { useAppSelector } from "../../hooks";
import { getSelectedProject } from "../../store/chatSlice";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTitleScreen = location.pathname === "/";
  const selectedProject = useAppSelector(getSelectedProject)!;
  const chats = selectedProject?.chats || [];

  return (
    <div className="layout__container">
      <header>
        <div className="leftSide__container">
          <ProjectSelect />
          <ChatNavbar chats={chats} />
        </div>
        {selectedProject && (
          <button
            className="leftSide__container-button"
            onClick={() => navigate("chat/create")}>
            Create Chat
          </button>
        )}
      </header>

      <main>
        <div
          className={`background_container ${isTitleScreen ? "active" : ""}`}
        />
        <Outlet />
      </main>
    </div>
  );
};
export default Layout;
