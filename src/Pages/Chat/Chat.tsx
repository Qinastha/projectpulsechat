import React from "react";
import io from "socket.io-client";

const Chat: React.FC = () => {
  const socket = io("http://localhost:4000");

  return <div>hello</div>;
};

export default Chat;
