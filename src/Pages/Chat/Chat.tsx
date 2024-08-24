import React, { lazy, useEffect, useState } from "react";
import "./Chat.scss";
import io, {Socket} from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getCurrentChat,
  getCurrentUser,
  handleMessageDelete,
  handleNewMessage,
  handleUpdateMessage,
} from "../../store/chatSlice";
import { IMember, IMessage } from "../../core";
import { NavLink } from "react-router-dom";
import pinkBlossom from "../../assets/pinkBlossom.png";
import useContextMenu from "../../core/utilities/useContextMenu";
import useMessageHandling from "../../core/utilities/handleMessage";

const Message = lazy(() => import("../../core/components/Message/Message"));

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(getCurrentChat)!;
  const messages = chat.messages;
  const currentUser = useAppSelector(getCurrentUser)!;
  const [usersTyping, setUsersTyping] = useState<IMember[]>([]);
  const socket: Socket = io("http://localhost:4000");

  useEffect(() => {
    socket.emit("joinChat", chat._id);

    socket.on("message", (message: IMessage) => {
      dispatch(handleNewMessage(message));
    });

    socket.on("typingMessage", (sender: IMember) => {
      if (sender._id !== currentUser._id) {
        setUsersTyping(prev => {
          if (!prev.find(user => user._id === sender._id)) {
            return [...prev, sender];
          }
          return prev;
        });
      }
    });

    socket.on("stopTypingMessage", (sender: IMember) => {
      setUsersTyping(prev => prev.filter(user => user._id !== sender._id));
    });

    socket.on("messageEdit", (updatedMessage: IMessage) => {
      dispatch(handleUpdateMessage(updatedMessage));
      setEditingMessageId(null);
    });

    socket.on("messageDelete", (messageId: string) => {
      dispatch(handleMessageDelete(messageId));
    });

    return () => {
      socket.off("message");
      socket.off("typingMessage");
      socket.off("stopTypingMessage");
    };
  }, [chat._id]);

  const {
    menuVisible,
    menuPosition,
    menuMessageId,
    editingMessageId,
    handleRightClick,
    handleClickOutside,
    handleEditMessageMode,
    setEditingMessageId,
  } = useContextMenu(currentUser);

  const {
    messageText,
    sendMessage,
    handleMessageChange,
    handleMessageUpdate,
    handleDeleteMessage,
  } = useMessageHandling(socket, chat._id, currentUser);


  return (
    <div className="chat__container" onClick={(e) => handleClickOutside(e)}>
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
              <span className="chat__header-participant-typing">
                {" "}
                typing...
              </span>
            </div>
          )}
        </div>
        <div className="chat__header-options">
          <NavLink to="edit" className="chat__header-options-settings">
            <img
                src={pinkBlossom}
                alt="Settings"
            />
          </NavLink>
        </div>
      </div>
      <div className="chat__messages">
        {messages.map((message: IMessage) => (
          <Message
            key={message._id}
            message={message}
            isSelf={message.sender._id === currentUser._id}
            menuVisible={menuVisible && menuMessageId === message._id}
            menuPosition={menuPosition}
            isEditing={editingMessageId === message._id}
            editingMessageId={editingMessageId}
            handleEditMessageMode={handleEditMessageMode}
            handleRightClick={handleRightClick}
            handleClickOutside={handleClickOutside}
            handleMessageUpdate={handleMessageUpdate}
            handleDeleteMessage={handleDeleteMessage}
          />
        ))}
      </div>
      <div className="chat_send-message">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat__send-input"
          value={messageText}
          onChange={(e: any) => handleMessageChange(e)}
        />
        <button onClick={sendMessage} className="chat__send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;