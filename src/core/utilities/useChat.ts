import React, { useState } from "react";
import axios from "axios";
import { CHAT_REQUIRED_INPUTS } from "../constants";
import { ChatFormDataInputs, IChat, RequiredInput } from "../interfaces";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { handleCurrentChat, handleNewChat } from "../../store/chatSlice";

export const useChat = (
  initialChatData: ChatFormDataInputs,
  currentChat: IChat,
  mode: "create" | "update",
) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [chatFormData, setChatFormData] =
    useState<ChatFormDataInputs>(initialChatData);

  const requiredInputs: RequiredInput[] = CHAT_REQUIRED_INPUTS;

  const inputValues = [
    chatFormData.name,
    chatFormData.description,
    chatFormData.members,
    chatFormData.avatar,
  ];
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setChatFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file: string) => {
    if (!file) {
      return;
    }
    const response = await axios.post(
      "http://51.21.127.157:4000/api/core/uploadImage",
      { avatar: file },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    if (response?.data) {
      setChatFormData({
        ...chatFormData,
        avatar: response.data.value,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const url =
        mode === "create"
          ? "http://51.21.127.157:4000/api/chat"
          : `http://localhost:4000/api/chat/${currentChat._id}`;
      const method = mode === "create" ? axios.post : axios.put;
      const response = await method(url, chatFormData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response?.data?.value) {
        setChatFormData({
          ...chatFormData,
          name: "",
          description: "",
          members: [],
          avatar: "",
        });
        const data = response.data.value;
        dispatch(
          mode === "create" ? handleNewChat(data) : handleCurrentChat(data),
        );
        const newId: string = response.data.value._id;
        navigate(`../chat/${newId}`);
      }
    } catch (error) {
      console.error("Error during posting new project:", error);
    }
  };
  return {
    chatFormData,
    requiredInputs,
    inputValues,
    navigate,
    handleInputChange,
    handleFileUpload,
    handleSubmit,
  };
};
