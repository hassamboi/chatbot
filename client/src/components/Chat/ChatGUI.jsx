import "./ChatGUI.css";
import React, { Fragment, useState } from "react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Para } from "../Login/LoginElements";
import { io } from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
const socket = io("http://localhost:5000");
export default function ChatGUI() {
  const { token } = useAuth();
  const { passData, setpassData } = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    socket.on("message", message => {
      console.log(message);
    });
    scrollToBottom();
  }, []);

  const onSubmit = data => {
    //emitting to the server
    // setpassData(data);
    console.log(data);
    const userdata = { ...data, token };
    socket.emit("chatMessage", userdata);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  const renderChat = passData => {
    return (
      <>
        <div className="msg right-msg">
          <div className="msg-img" />
          <div className="msg-bubble">
            <div className="msg-info">
              <div className="msg-info-name">Han</div>
              <div className="msg-info-time">12.30</div>
            </div>
            <div className="msg-text">{passData}</div>
          </div>
        </div>
      </>
    );
  };

  return (
    <Fragment>
      <section className="msger">
        <header className="msger-header"></header>

        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">Hi, welcome to the Chat Bot! Go ahead and send me a message. </div>
            </div>
          </div>
          {renderChat()}
          {/* <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">Hi, welcome to SimpleChat! Go ahead and send me a message. </div>
            </div>
          </div>
          <div className="msg right-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Sajad</div>
                <div className="msg-info-time">12:46</div>
              </div>
              <div className="msg-text">You can change your name in JS section!</div>
            </div>
          </div> */}

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
            })}
          />

          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
        {/* <Para>{errors.text?.message}</Para> */}
      </section>
    </Fragment>
  );
}
