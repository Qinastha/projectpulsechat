import React from "react";
import "./ChatNavbar.scss";
import { ChatItem, IChat } from "../../core";
import { useAppDispatch } from "../../hooks";
import { setCurrentChat } from "../../store/chatSlice";

interface ChatNavbarProps {
  chats: IChat[];
}

export const ChatNavbar: React.FC<ChatNavbarProps> = ({ chats }) => {
  const dispatch = useAppDispatch();

  const selectChat = (chatId: string) => {
    dispatch(setCurrentChat(chatId));
  };

  return (
    <div>
      {chats.length > 0 ? (
        <div className="chatProjects__container">
          {chats.map((chat: IChat) => (
                <ChatItem key={chat._id} chat={chat} selectChat={selectChat} />
          ))}
        </div>
      ) : (
        <div className="projectChats__item">
          {`There are no chats. Please select a project${chats.length > 0 ? " or add a new one." : "."}`}
        </div>
      )}
    </div>
  );
};
