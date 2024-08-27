import React, { useEffect, useRef, useState } from "react";
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
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(getSelectedProject)!;
  const chats = selectedProject?.chats || [];
  const user = useAppSelector(getCurrentUser);
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const createChat = () => {
    dispatch(setCurrentChatNull());
    navigate("chat/create");
  };

  useEffect(() => {
    dispatch(getAllUserProjects());
  }, [user, selectedProject]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current - touchEndX.current > 50) {
      setIsNavbarHidden(true);
    }

    if (touchEndX.current - touchStartX.current > 50) {
      setIsNavbarHidden(false);
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  return (
    <div className={`layout__container ${!isNavbarHidden ? "" : "hidden"}`}>
      <header>
        <div className={`header__container ${!isNavbarHidden ? "" : "hidden"}`}>
          <div className="leftSide__container">
            <ProjectSelect />
            <ChatNavbar chats={chats} selectedProject={selectedProject} />
          </div>
          {selectedProject && (
            <button className="leftSide__container-button" onClick={createChat}>
              Create Chat
            </button>
          )}
        </div>
      </header>

      <main>
        <div
          className="main__container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};
export default Layout;
