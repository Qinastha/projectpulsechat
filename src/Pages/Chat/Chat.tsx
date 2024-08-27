import React, { lazy, useEffect, useRef, useState } from "react";
import "./Chat.scss";
import io, { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  getCurrentChat,
  getCurrentUser,
  handleMessageDelete,
  handleNewMessage,
  handleUpdateMessage,
} from "../../store/chatSlice";
import { IMember, IMessage } from "../../core";
import useContextMenu from "../../core/utilities/useContextMenu";
import useMessageHandling from "../../core/utilities/handleMessage";
import { ChatFixedHeader } from "../../Components";
import sendIcon from "../../assets/Send Icon.png";

const Message = lazy(() => import("../../core/components/Message/Message"));

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(getCurrentChat)!;
  const messages = chat.messages;
  const currentUser = useAppSelector(getCurrentUser)!;
  const [usersTyping, setUsersTyping] = useState<IMember[]>([]);
  const lastMessageRef = useRef<HTMLDivElement>(null);
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
      socket.disconnect();
    };
  }, [chat._id]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
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
    <div className="chat__container" onClick={e => handleClickOutside(e)}>
      <ChatFixedHeader chat={chat} usersTyping={usersTyping} />
      <div className="chat__messages">
        {messages.map((message: IMessage, index: number) => (
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
        <div ref={lastMessageRef} />
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
          <img src={sendIcon} alt="send" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
