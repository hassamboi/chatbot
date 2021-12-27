import "./ChatGUI.css";
import React, { Fragment, useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Para } from "../Login/LoginElements";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/posts";
import MessageList from "../MessageList";
const socket = io("http://localhost:5000");
export default function ChatGUI() {
  const [messages, setMessages] = useState([]);
  const { token, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };
  const getMessages = async () => {
    const response = await api.get("/chat", {
      headers: {
        "x-auth-token": token,
      },
    });
    // console.log(response.data.messages);
    setMessages(response.data.messages);
  };
  useEffect(() => {
    // runs once to fetch old chat
    getMessages();
    console.log("mein hon");
    scrollToBottom();
  }, [messagesEndRef]);

  useEffect(() => {
    //runs everytime to update chat
    socket.on("message", msg => {
      getMessages();
      console.log(msg);
      scrollToBottom();
    });
  }, [messagesEndRef]);

  const onSubmit = data => {
    reset({ text: "" });
    console.log(data);
    const userdata = { ...data, token };
    socket.emit("chatMessage", userdata);
  };

  return (
    <Fragment>
      <section className="msger">
        <header className="msger-header">
          {" "}
          <Para>{errors.text?.message}</Para>
        </header>

        <main className="msger-chat">
          {messages && <MessageList messages={messages} />}

          <div ref={messagesEndRef} />
        </main>

        <form className="msger-inputarea" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            name="text"
            className="msger-input"
            placeholder="Enter your message..."
            {...register("text", {
              minLength: {
                value: 2,
                message: "Message is too short",
              },
              maxLength: {
                value: 100,
                message: "Message is too long",
              },
            })}
          />

          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </Fragment>
  );
}
