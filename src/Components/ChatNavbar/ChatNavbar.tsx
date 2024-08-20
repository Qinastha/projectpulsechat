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
    //navigate for required chat in future
  };
  return (
    <div className="projectChats__container">
      {chats.length > 0 ? (
        <div>
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