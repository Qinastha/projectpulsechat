import React, { useEffect, useState } from "react";
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
import { useHideNav } from "@Qinastha/pulse_library";
import { useTranslation } from "react-i18next";

const Layout: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const selectedProject = useAppSelector(getSelectedProject)!;
  const chats = selectedProject?.chats || [];
  const user = useAppSelector(getCurrentUser);
  const [isNavbarHidden, setIsNavbarHidden] = useState<boolean>(false);
  const isChatManage =
    location.pathname.includes("/edit") ||
    location.pathname.includes("/create");

  // Hide/show the navbar on touch events
  const { handleTouchStart, handleTouchEnd, handleTouchMove } = useHideNav({
    onHide: () => setIsNavbarHidden(true),
    onShow: () => setIsNavbarHidden(false),
  });

  const createChat = () => {
    dispatch(setCurrentChatNull());
    navigate("chat/create");
  };

  useEffect(() => {
    dispatch(getAllUserProjects());
  }, [user, selectedProject]);

  return (
    <div className={`layout__container ${!isNavbarHidden ? "" : "hidden"}`}>
      <header>
        <div className={`header__container ${!isNavbarHidden ? "" : "hidden"}`}>
          <div className="leftSide__container">
            <ProjectSelect />
            <ChatNavbar chats={chats} selectedProject={selectedProject} />
          </div>
          {selectedProject && !isChatManage && (
            <button className="leftSide__container-button" onClick={createChat}>
              {t("layout.create")}
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
