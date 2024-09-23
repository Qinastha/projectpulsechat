import React from "react";
import "./ChatNavbar.scss";
import { ChatItem, IChat, IProject } from "../../core";
import { useAppDispatch } from "../../hooks";
import { setCurrentChat } from "../../store/chatSlice";
import { useViewport } from "@Qinastha/pulse_library";
import { useTranslation } from "react-i18next";

interface ChatNavbarProps {
  chats: IChat[];
  selectedProject: IProject;
}

export const ChatNavbar: React.FC<ChatNavbarProps> = ({
  chats,
  selectedProject,
}) => {
  const { t } = useTranslation();
  const alterText = !selectedProject
    ? t("chatNavbar.selectProject")
    : t("chatNavbar.addProject");
  const dispatch = useAppDispatch();
  const { viewportWidth } = useViewport();

  const selectChat = (chatId: string) => {
    dispatch(setCurrentChat(chatId));
  };

  return (
    <div className="chatProjects__container">
      <h3>{t("chatNavbar.chat")}:</h3>
      {chats.length > 0 ? (
        <div className="chatProjects__container-list">
          {chats.map((chat: IChat) => (
            <ChatItem
              key={chat._id}
              chat={chat}
              viewportWidth={viewportWidth}
              selectChat={selectChat}
            />
          ))}
        </div>
      ) : (
        <div className="chatProjects__container-alter-text">{alterText}</div>
      )}
    </div>
  );
};
