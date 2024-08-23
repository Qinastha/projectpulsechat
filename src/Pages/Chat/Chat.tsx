import React, { lazy, useEffect, useRef, useState } from "react";
import "./Chat.scss";
import io from "socket.io-client";
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

const Message = lazy(() => import("../../core/components/Message/Message"));

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const chat = useAppSelector(getCurrentChat)!;
  const chatId = chat._id;
  const messages = chat.messages;
  const currentUser = useAppSelector(getCurrentUser)!;
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuMessageId, setMenuMessageId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [usersTyping, setUsersTyping] = useState<IMember[]>([]);

  const socket = io("http://localhost:4000");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

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
      console.log("listener update mesasge");
      console.log(updatedMessage);
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

  const handleRightClick = (
    e: React.MouseEvent,
    messageId: string,
    senderId: string,
  ) => {
    if (senderId === currentUser._id) {
      e.preventDefault();
      const menuWidth = 160;
      const menuHeight = 100;
      const padding = 15;

      let x = e.clientX;
      let y = e.clientY;

      if (x + menuWidth > window.innerWidth) {
        x = window.innerWidth - menuWidth - padding;
      }

      if (y + menuHeight > window.innerHeight) {
        y = window.innerHeight - menuHeight - padding;
      }
      setMenuPosition({ x, y });
      setMenuMessageId(messageId);
      setMenuVisible(true);
    }
  };

  const handleClickOutside = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuVisible(false);
  };

  const handleEditMessageMode = (messageId: string) => {
    setEditingMessageId(messageId);
    setMenuVisible(false);
  };

  const sendMessage = () => {
    const message = {
      chatId: chat._id,
      sender: currentUser._id,
      content: messageText,
    };
    setMessageText("");
    socket.emit("sendMessage", { chatId: chat._id, message });
    socket.emit("messageStopTyping", { chatId: chat._id, sender: currentUser });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessageText(e.target.value);
    socket.emit("messageTyping", { chatId: chat._id, sender: currentUser });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("messageStopTyping", {
        chatId: chat._id,
        sender: currentUser,
      });
    }, 2000);
  };

  const handleMessageUpdate = (messageId: string, content: string) => {
    socket.emit("editMessage", {
      chatId: chat._id,
      messageId: messageId,
      content: content,
    });
  };

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("deleteMessage", { chatId: chat._id, messageId: messageId });
  };

  return (
    <div className="chat__container" onClick={handleClickOutside}>
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
            Settings
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
