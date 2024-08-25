import React from "react";
import { IChat } from "../../interfaces";
import { NavLink } from "react-router-dom";

interface ChatItemProps {
  chat: IChat;
  viewportWidth: number;
  selectChat: (chatId: string) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  viewportWidth,
  selectChat,
}) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const charLimit = viewportWidth > 1500 ? 30 : 15;
  const lastMessageContent = lastMessage
    ? lastMessage.content.trim().substring(0, charLimit) +
      (lastMessage.content.length > charLimit ? "..." : "")
    : "";
  const lastMessageTime = lastMessage
    ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <NavLink
      to={`chat/${chat._id}`}
      className="projectChats__item"
      onClick={() => selectChat(chat._id)}>
      <img
        src={chat.avatar}
        alt="avatar"
        className="projectChats__item-avatar"
      />
      <div className="projectChats__item-info">
        <span className="projectChats__item-name">{chat.name}</span>
        {lastMessage ? (
          <div className="projectChats__item-info-content">
            <div className="projectChats__item-info-content-text">
              {lastMessageContent}
            </div>
            <div className="projectChats__item-info-content-time">
              {lastMessageTime}
            </div>
          </div>
        ) : (
          <span
            className="projectChats__item-info-content"
            style={{ textAlign: "center" }}>
            No messages yet
          </span>
        )}
      </div>
    </NavLink>
  );
};
