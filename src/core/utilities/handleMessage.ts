import React, { useState, useRef } from "react";
import { IMember } from "../../core";
import { Socket } from "socket.io-client";

const useMessageHandling = (
  socket: Socket,
  chatId: string,
  currentUser: IMember,
) => {
  const [messageText, setMessageText] = useState("");
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sendMessage = () => {
    const message = {
      chatId,
      sender: currentUser._id,
      content: messageText,
    };
    setMessageText("");
    socket.emit("sendMessage", { chatId, message });
    socket.emit("messageStopTyping", { chatId, sender: currentUser });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setMessageText(e.target.value);
    socket.emit("messageTyping", { chatId, sender: currentUser });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("messageStopTyping", { chatId, sender: currentUser });
    }, 2000);
  };

  const handleMessageUpdate = (messageId: string, content: string) => {
    socket.emit("editMessage", { chatId, messageId, content });
  };

  const handleDeleteMessage = (messageId: string) => {
    socket.emit("deleteMessage", { chatId, messageId });
  };

  return {
    messageText,
    setMessageText,
    sendMessage,
    handleMessageChange,
    handleMessageUpdate,
    handleDeleteMessage,
  };
};

export default useMessageHandling;
