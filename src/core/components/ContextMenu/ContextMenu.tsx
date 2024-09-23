import React from "react";
import "./ContextMeny.scss";
import { useTranslation } from "react-i18next";

export interface ContextMenuProps {
  menuPosition: { x: number; y: number };
  id: string;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleEditMessageMode: (messageId: string) => void;
  handleDeleteMessage: (messageId: string) => void;
}

// ContextMenu component to display context menu on right-click on message
export const ContextMenu: React.FC<ContextMenuProps> = ({
  menuPosition,
  id,
  handleClickOutside,
  handleEditMessageMode,
  handleDeleteMessage,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className="chat__message-menu"
      style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }}
      onClick={handleClickOutside}>
      <div
        className="chat__message-menu-option"
        onClick={() => handleEditMessageMode(id)}>
        {t("contextMenu.edit")}
      </div>
      <div
        className="chat__message-menu-option"
        onClick={() => handleDeleteMessage(id)}>
        {t("contextMenu.delete")}
      </div>
    </div>
  );
};
