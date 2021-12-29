import { useAuth } from "../hooks/useAuth";

export default function MessageList({ messages }) {
  const { user } = useAuth();

  return (
    <>
      {messages
        .slice(0)
        .reverse()
        .map((message, index) => (
          <div key={message._id ? message._id : index}>
            <div className="msg right-msg">
              <div className="msg-img" />
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">
                    {user ? user.name : "You"}
                  </div>
                </div>
                <div className="msg-text">{message.text}</div>
              </div>
            </div>
            <div className="msg left-msg">
              <div className="msg-img" />
              <div className="msg-bubble">
                <div className="msg-info">
                  <div className="msg-info-name">BOT</div>
                </div>
                <div className="msg-text">{message.response}</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
