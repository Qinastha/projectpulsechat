import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAppSelector } from "../../hooks";
import { getCurrentChat, getCurrentUser } from "../../store/chatSlice";
import { IChat, IMember, IMessage } from "../../core";
import Chat from "./Chat";

jest.mock("socket.io-client", () => {
  const mSocket = {
    emit: jest.fn(),
    on: jest.fn(),
    off: jest.fn(),
    disconnect: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

jest.mock("../../hooks", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

const mockUseContextMenu = {
  menuVisible: false,
  menuPosition: { x: 0, y: 0 },
  menuMessageId: null,
  editingMessageId: null,
  handleRightClick: jest.fn(),
  handleClickOutside: jest.fn(),
  handleEditMessageMode: jest.fn(),
  setEditingMessageId: jest.fn(),
};

jest.mock("../../core/utilities/useContextMenu", () =>
  jest.fn(() => mockUseContextMenu),
);

const mockUseMessageHandling = {
  messageText: "",
  sendMessage: jest.fn(),
  handleMessageChange: jest.fn(),
  handleMessageUpdate: jest.fn(),
  handleDeleteMessage: jest.fn(),
};

jest.mock("../../core/utilities/handleMessage", () =>
  jest.fn(() => mockUseMessageHandling),
);

jest.mock("../../Components", () => ({
  ChatFixedHeader: jest.fn(() => <div>Chat Fixed Header</div>),
}));

jest.mock("../../core/components/Message/Message", () => () => (
  <div>Message Content</div>
));

let scrollIntoViewMock = jest.fn();
window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

describe("Chat component", () => {
  const mockUser: IMember = {
    _id: "789",
    email: "test@example.com",
    userName: "testUser",
    firstName: "testFirstName",
    lastName: "testLastName",
    dateOfBirth: "123",
    profile: null,
    position: "project manager",
  };

  const mockMessages: IMessage[] = [
    {
      _id: "123",
      sender: mockUser,
      content: "Hello, world!",
      date: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockChat: IChat = {
    _id: "123",
    name: "Test Chat",
    members: [],
    messages: mockMessages,
    createdAt: new Date().toString(),
    updatedAt: new Date().toString(),
    currentProject: {
      _id: "456",
      projectName: "Test Project",
      projectDescription: "Test project description",
      projectAvatar: "",
      members: [],
      isCompleted: false,
      chats: [],
    },
    avatar: "",
    description: "Test chat description",
  };

  beforeEach(() => {
    jest.clearAllMocks();

    (useAppSelector as jest.Mock).mockImplementation(selector => {
      if (selector === getCurrentChat) {
        return mockChat;
      } else if (selector === getCurrentUser) {
        return mockUser;
      } else {
        return null;
      }
    });
  });

  test("renders chat header and messages", () => {
    render(<Chat />);

    expect(screen.findByText("Test Chat")).toBeTruthy();
    expect(screen.findByText("Chat Fixed Header")).toBeTruthy();
    expect(screen.findByText("Message Content")).toBeTruthy();
  });

  test("send message into chat", () => {
    render(<Chat />);

    const inputField: HTMLInputElement =
      screen.getByPlaceholderText("Type a message...");
    const sendMessageButton: HTMLButtonElement = screen.getByAltText("send");

    fireEvent.change(inputField, { target: { value: "Hello, world!" } });
    fireEvent.click(sendMessageButton);

    expect(mockUseMessageHandling.sendMessage).toHaveBeenCalled();
    expect(inputField.value).toBe("");
  });
});
