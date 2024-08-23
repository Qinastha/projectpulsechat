import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { ChatNavbar } from "../ChatNavbar/ChatNavbar";
import { ProjectSelect } from "../ProjectSelect/ProjectSelect";
import "./Layout.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getAllUserProjects,
  getCurrentUser,
  getSelectedProject,
  setCurrentChatNull,
} from "../../store/chatSlice";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const isTitleScreen = location.pathname === "/";
  const selectedProject = useAppSelector(getSelectedProject)!;
  const chats = selectedProject?.chats || [];
  const user = useAppSelector(getCurrentUser);
  const createChat = () => {
    dispatch(setCurrentChatNull());
    navigate("chat/create");
  };

  useEffect(() => {
    dispatch(getAllUserProjects());
  }, [user, selectedProject]);

  return (
    <div className="layout__container">
      <header>
        <div className="leftSide__container">
          <ProjectSelect />
          <ChatNavbar chats={chats} />
        </div>
        {selectedProject && (
          <button className="leftSide__container-button" onClick={createChat}>
            Create Chat
          </button>
        )}
      </header>

      <main>
        <div
          className={`background_container ${isTitleScreen ? "active" : ""}`}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default Layout;
