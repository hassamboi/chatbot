import "./ChatGUI.css";
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/posts";
import MessageList from "../MessageList";

// global variable for socket so the connection is established once
let socket;

export default function ChatGUI() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const { token } = useAuth();

  const getMessages = async () => {
    const response = await api.get("/chat", {
      headers: {
        "x-auth-token": token,
      },
    });
    setMessages(response.data.messages);
  };

  useEffect(() => {
    socket = io("http://localhost:5000");
    getMessages();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const text = inputMessage;
    const userdata = { text, token };
    socket.emit("message", userdata);
    setInputMessage("");
    socket.on("response", response => {
      setMessages(() => {
        return [...messages, { text, response }];
      });
    });
  };

  return (
    <Fragment>
      <section className="msger">
        <header className="msger-header"></header>

        <main className="msger-chat">
          {messages && <MessageList messages={messages} />}
        </main>

        <form className="msger-inputarea" onSubmit={e => handleSubmit(e)}>
          <input
            type="text"
            name="text"
            className="msger-input"
            placeholder="Enter your message..."
            onChange={e => setInputMessage(e.target.value)}
            value={inputMessage}
          />

          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </Fragment>
  );
}
