import "./ChatGUI.css";
import React, { Fragment, useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Para } from "../Forms/FormElements";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import api from "../../api/posts";
import MessageList from "../MessageList";
let socket;
export default function ChatGUI() {
  const [messages, setMessages] = useState([]);
  const { token, user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getMessages = async () => {
    const response = await api.get("/chat", {
      headers: {
        "x-auth-token": token,
      },
    });
    setMessages(response.data.messages);
  };

  useEffect(() => {
    //runs everytime to update chat
    const controller = new AbortController();
    socket = io("http://localhost:5000");
    getMessages();
    socket.on("message", msg => {
      getMessages();
      console.log(msg);
    });

    return () => {
      controller.abort();
    };
  }, []);

  const onSubmit = async data => {
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

        <main className="msger-chat">{messages && <MessageList messages={messages} />}</main>

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
