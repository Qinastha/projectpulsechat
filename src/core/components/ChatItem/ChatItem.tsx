import React from "react";
import { IChat } from "../../interfaces";

interface ChatItemProps {
  chat: IChat;
  selectChat: (chatId: string) => void;
}

export const ChatItem: React.FC<ChatItemProps> = ({ chat, selectChat }) => {
  const lastMessage = chat.messages[chat.messages.length - 1];
  const lastMessageTime = lastMessage
    ? new Date(lastMessage.createdAt).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="projectChats__item" onClick={() => selectChat(chat._id)}>
      <div className="projectChats__item">
        <img
          src={chat.avatar}
          alt="avatar"
          className="projectChats__item-avatar"
        />
        <div className="projectChats__item-info">
          <span>{chat.name}</span>
          {lastMessage ? (
            <div className="projectChats__item-info-time">
              <div>{lastMessage.content}</div>
              <div>{lastMessageTime}</div>
            </div>
          ) : (
            <span>No messages yet</span>
          )}
        </div>
      </div>
    </div>
  );
};
