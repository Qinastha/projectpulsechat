import React, { useState } from "react";
import { IMember } from "../interfaces";

const useContextMenu = (currentUser: IMember) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [menuMessageId, setMenuMessageId] = useState<string | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

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

  return {
    menuVisible,
    menuPosition,
    menuMessageId,
    editingMessageId,
    handleRightClick,
    handleClickOutside,
    handleEditMessageMode,
    setMenuVisible,
    setMenuMessageId,
    setEditingMessageId,
  };
};

export default useContextMenu;
