import React from "react";
import "./ManageChat.scss";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {
    deleteChat,
    getCurrentChat,
    getSelectedProject,
    getSelectedProjectsMembers,
} from "../../store/chatSlice";
import {PulseForm} from "@Qinastha/pulse_library";
import {useChat} from "../../core";


const ManageChat: React.FC<{ mode: "create" | "update" }> = ({
                                                                      mode,
                                                                    }) => {
    const dispatch = useAppDispatch();
    const selectedProject = useAppSelector(getSelectedProject)!;
    const currentChat = useAppSelector(getCurrentChat)!;
    const members = useAppSelector(getSelectedProjectsMembers);

  const initialChatData = {
    name: currentChat?.name ?? "",
    description: currentChat?.description ?? "",
    members: currentChat?.members ?? [],
    avatar: currentChat?.avatar ?? "",
    currentProject: selectedProject,
  };

  const {
      inputValues,
      requiredInputs,
      navigate,
      handleInputChange,
      handleFileUpload,
      handleSubmit,
  } = useChat(initialChatData, currentChat, mode)

  return (
      <div className="manageChat__container">
      <PulseForm
          requiredInputs={requiredInputs}
          inputValues={inputValues}
          formTitle={`${mode==="create" ? "Create new chat" : "Manage chat"}`}
          allMembers={members}
          onChange={handleInputChange}
          handleFile={handleFileUpload}/>

          <div className="manageChat__container-button-container">
              <button type="button" className="manageChat__container-button" onClick={handleSubmit}>
                  {mode === "create"? "Create chat" : "Update chat"}
              </button>
              {mode==="update" && (
                  <button type="button" className="manageChat__container-button manageChat__container-button--delete"
                          onClick={() => {
                              dispatch(deleteChat(currentChat._id))
                              navigate("/")}}>
                      Delete chat
                  </button>
          )}
          </div>
      </div>
  )
};

export default ManageChat