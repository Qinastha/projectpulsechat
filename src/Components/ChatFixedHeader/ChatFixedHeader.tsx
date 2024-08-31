import React from "react";
import { IChat, IMember } from "../../core";
import { NavLink } from "react-router-dom";
import pinkBlossom from "../../assets/pinkBlossom.png";
import "./ChatFixedHeader.scss";

interface ChatFixedHeaderProps {
  chat: IChat;
  usersTyping: IMember[];
}

export const ChatFixedHeader: React.FC<ChatFixedHeaderProps> = ({
  chat,
  usersTyping,
}) => {
  return (
    <div className="chat_fixed-header">
      <div className="chat__header-title" data-description={chat.description}>
        {chat.name}
        {usersTyping.length > 0 && (
          <div className="chat__header-participants">
            {usersTyping.map((member: IMember, index: number) => (
              <span key={index} className="chat__header-participant">
                {member.firstName}
              </span>
            ))}
            <span className="chat__header-participant-typing"> typing...</span>
          </div>
        )}
      </div>
      <div className="chat__header-options">
        <NavLink to="edit" className="chat__header-options-settings">
          <img src={pinkBlossom} alt="Settings" />
        </NavLink>
      </div>
    </div>
  );
};
