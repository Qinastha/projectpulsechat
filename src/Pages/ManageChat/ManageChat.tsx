import React from "react";
import "./ManageChat.scss";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  deleteChat,
  getCurrentChat,
  getCurrentUser,
  getSelectedProject,
  getSelectedProjectsMembers,
} from "../../store/chatSlice";
import { PulseForm } from "@Qinastha/pulse_library";
import { useChat } from "../../core";

const ManageChat: React.FC<{ mode: "create" | "update" }> = ({ mode }) => {
  const dispatch = useAppDispatch();
  const selectedProject = useAppSelector(getSelectedProject)!;
  const currentChat = useAppSelector(getCurrentChat)!;
  const members = useAppSelector(getSelectedProjectsMembers);
  const currentUser = useAppSelector(getCurrentUser)!;

  const initialChatData = {
    name: currentChat?.name ?? "",
    description: currentChat?.description ?? "",
    members: currentChat?.members ?? [],
    avatar: currentChat?.avatar ?? "",
    currentProject: selectedProject,
  };

  const {
    chatFormData,
    inputValues,
    requiredInputs,
    navigate,
    handleInputChange,
    handleFileUpload,
    handleSubmit,
  } = useChat(initialChatData, currentChat, mode);

  // Function to validate form inputs before submission
  const isFormValid = () => {
    return Object.values(chatFormData).every(
      value =>
        value !== null && value !== undefined && value.toString().trim() !== "",
    );
  };

  return (
    <div className="manageChat__container">
      <div className="manageChat__container-formContainer">
        <PulseForm
          requiredInputs={requiredInputs}
          inputValues={inputValues}
          formTitle={`${mode === "create" ? "Create new chat" : "Manage chat"}`}
          allMembers={members}
          currentUser={currentUser}
          onChange={handleInputChange}
          handleFile={handleFileUpload}
        />

        <div className="manageChat__container-button-container">
          <button
            type="button"
            className="manageChat__container-button"
            onClick={handleSubmit}
            disabled={!isFormValid()}>
            {mode === "create" ? "Create chat" : "Update chat"}
          </button>
          {mode === "update" && (
            <button
              type="button"
              className="manageChat__container-button manageChat__container-button--delete"
              onClick={() => {
                dispatch(deleteChat(currentChat._id));
                navigate("/");
              }}>
              Delete chat
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageChat;
