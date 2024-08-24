import React, { useEffect, useRef, useState } from "react";
import {ContextMenu, IMessage} from "../../index";
import "./Message.scss";

interface MessageProps {
  message: IMessage;
  isSelf: boolean;
  menuVisible: boolean;
  menuPosition: { x: number; y: number };
  isEditing: boolean;
  editingMessageId: string | null;
  handleEditMessageMode: (messageId: string) => void;
  handleClickOutside: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  handleRightClick: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    messageId: string,
    senderId: string,
  ) => void;
  handleMessageUpdate: (messageId: string, content: string) => void;
  handleDeleteMessage: (messageId: string) => void;
}

const Message: React.FC<MessageProps> = ({
  message,
  isSelf,
  menuVisible,
  menuPosition,
  isEditing,
  editingMessageId,
  handleEditMessageMode,
  handleClickOutside,
  handleRightClick,
  handleMessageUpdate,
  handleDeleteMessage,
}) => {
  const [messageContent, setMessageContent] = useState<string>(message.content);
  const [textAreaSize, setTextAreaSize] = useState({
    width: "0px",
    height: "0px",
  });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current?.style) {
      setTextAreaSize({
        width: contentRef.current!.scrollWidth + "px",
        height: contentRef.current!.scrollHeight + 30 + "px",
      });
    }
  }, [messageContent]);

  return (
    <div className={`chat__message ${isSelf ? "chat__message--self" : ""}`}>
      <div className="chat__message-avatar">
        <img
          src={message.sender!.profile!.avatar ?? ""}
          alt={message.sender.userName}
        />
      </div>
      <div

        className={`chat__message-container ${isSelf ? "chat__message-container--self" : ""}`}
        onContextMenu={e =>
          handleRightClick(e, message._id, message.sender._id)
        }>
        <div className="chat__message-header">
          <div className="chat__message-sender">{message.sender.firstName}</div>
          <div className="chat__message-time">
            {new Date(message.createdAt).toLocaleTimeString()}
          </div>
        </div>
        <div className="chat__message-content">
          {!isEditing ? (
            <div ref={contentRef}>{message.content}</div>
          ) : (
            <div className="chat__message-content-edit">
              <textarea
                ref={textareaRef}
                className="chat__message-content-input"
                style={{
                  width: textAreaSize.width,
                  height: textAreaSize.height,
                }}
                value={messageContent}
                onChange={e => setMessageContent(e.target.value)}
                autoFocus
              />
              <button
                className="chat__message-content-button"
                onClick={() =>
                  handleMessageUpdate(message._id, messageContent)
                }>
                Save changes
              </button>
            </div>
          )}
        </div>
      </div>

      {menuVisible && !editingMessageId && (
          <ContextMenu
              menuPosition={menuPosition}
              id={message._id}
              handleEditMessageMode={handleEditMessageMode}
              handleClickOutside={handleClickOutside}
              handleDeleteMessage={handleDeleteMessage}
          />
      )}
    </div>
  );
};

export default Message;
