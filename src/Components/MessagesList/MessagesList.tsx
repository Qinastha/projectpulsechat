import React from "react";
import {IMessage} from "../../core";

interface MessageListProps {
    message: IMessage;
    isSelf: boolean;
}

const MessagesList:React.FC<MessageListProps> = ({ message, isSelf }) => {
    return (
        <div className={`chat__message ${isSelf ? "chat__message--self" : ""}`}>
            <div className="chat__message-avatar">
                <img
                    src={message.sender!.profile!.avatar || ""}
                    alt={message.sender.userName}
                />
            </div>
            <div className="chat__message-container">
                <div className="chat__message-header">
                    <div className="chat__message-sender">{message.sender.firstName}</div>
                    <div className="chat__message-time">
                        {new Date(message.createdAt).toLocaleTimeString()}
                    </div>
                </div>
                <div className="chat__message-content">{message.content}</div>
            </div>
        </div>
    );
};

export default MessagesList;