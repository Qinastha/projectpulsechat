import React, {lazy} from "react";
import "./Chat.scss"
import io from "socket.io-client";
import {useAppSelector} from "../../hooks";
import {getCurrentChat, getCurrentUser} from "../../store/chatSlice";
import {IMessage} from "../../core";
import {NavLink} from "react-router-dom";

const MessagesList = lazy(()=>import("../../Components/MessagesList/MessagesList"))

const Chat: React.FC = () => {
  const chat = useAppSelector(getCurrentChat)!;
  const messages = chat.messages
  const currentUser = useAppSelector(getCurrentUser)!;
  const socket = io("http://localhost:4000");

    return (
        <div className="chat__container">
            <div className="chat_fixed-header">
                <div className="chat__header-title" data-description={chat.description}>
                    {chat.name}
                </div>
                <div className="chat__header-options">
                    <NavLink to="edit" className="chat__header-options-settings">Settings</NavLink>
                </div>
            </div>
            <div className="chat__messages">
                {messages.map((message: IMessage) => (
                    <MessagesList
                        key={message._id}
                        message={message}
                        isSelf={message.sender._id === currentUser._id}
                    />
                ))}
            </div>
            <div className="chat_send-message">
                <input
                    type="text"
                    placeholder="Type a message..."
                    className="chat__send-input"
                />
                <button className="chat__send-button">Send</button>
            </div>
        </div>
    );
};

export default Chat;
