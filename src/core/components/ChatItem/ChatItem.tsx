import React from "react";
import { IChat } from "../../interfaces";
import { NavLink } from "react-router-dom";

interface ChatItemProps {
  chat: IChat;
  selectChat: (chatId: string) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, selectChat }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const lastMessageContent = lastMessage
    ? lastMessage.content.trim().substring(0, 15) +
      (lastMessage.content.length > 15 ? "..." : "")
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
          <div className="projectChats__item-info-time">
            <div>{lastMessageContent}</div>
            <div>{lastMessageTime}</div>
          </div>
        ) : (
          <span
            className="projectChats__item-info-time"
            style={{ textAlign: "center" }}>
            No messages yet
          </span>
        )}
      </div>
    </NavLink>
  );
};
