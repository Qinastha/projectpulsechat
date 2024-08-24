import React from "react";
import "./ContextMeny.scss"

export interface ContextMenuProps {
    menuPosition: { x: number; y: number };
    id: string;
    handleClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    handleEditMessageMode: (messageId: string) => void;
    handleDeleteMessage: (messageId: string) => void;
}
export const ContextMenu:React.FC<ContextMenuProps> = ({menuPosition,
                                                       id,
                                                       handleClickOutside,
                                                       handleEditMessageMode,
                                                       handleDeleteMessage,}) => {
    return(
    <div
        className="chat__message-menu"
        style={{top: `${menuPosition.y}px`, left: `${menuPosition.x}px`}}
        onClick={handleClickOutside}>
        <div
            className="chat__message-menu-option"
            onClick={() => handleEditMessageMode(id)}>
            Edit Message
        </div>
        <div
            className="chat__message-menu-option"
            onClick={() => handleDeleteMessage(id)}>
            Delete Message
        </div>
    </div>
    )
}