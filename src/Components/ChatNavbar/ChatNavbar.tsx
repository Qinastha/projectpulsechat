import React from "react";
import "./ChatNavbar.scss";
import { ChatItem, IChat, IProject } from "../../core";
import { useAppDispatch } from "../../hooks";
import { setCurrentChat } from "../../store/chatSlice";
import { useViewport } from "@Qinastha/pulse_library";

interface ChatNavbarProps {
  chats: IChat[];
  selectedProject: IProject;
}

export const ChatNavbar: React.FC<ChatNavbarProps> = ({
  chats,
  selectedProject,
}) => {
  const dispatch = useAppDispatch();
  const { viewportWidth } = useViewport();

  const selectChat = (chatId: string) => {
    dispatch(setCurrentChat(chatId));
  };

  return (
    <div className="chatProjects__container">
      <h3>Chats:</h3>
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
        <div className="chatProjects__container-alter-text">
          {`Please ${!selectedProject ? "select a project" : "add new chat"}`}
        </div>
      )}
    </div>
  );
};
