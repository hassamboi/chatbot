import { useForm } from "react-hook-form";
import "./ChatGUI.css";
import React, { Fragment } from "react";
import { useEffect, useRef } from "react";
export default function ChatGUI() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  // useEffect(() => {}, []);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <Fragment>
      <section className="msger">
        <header className="msger-header">
          <div className="msger-header-title">
            <i className="fas fa-comment-alt" />
          </div>
          <div className="msger-header-options">
            <span>
              <i className="fas fa-cog" />
            </span>
          </div>
        </header>

        <main className="msger-chat">
          <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
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
          </div>
          <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
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
          </div>{" "}
          <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                <div className="msg-info-time">12:45</div>
              </div>
              <div className="msg-text">Hi, welcome to SimpleChat! Go ahead and send me a message. 😄</div>
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
          </div>{" "}
          <div ref={messagesEndRef} />
        </main>

        <form className="msger-inputarea">
          <input type="text" className="msger-input" placeholder="Enter your message..." />
          <button type="submit" className="msger-send-btn">
            Send
          </button>
        </form>
      </section>
    </Fragment>
  );
}
