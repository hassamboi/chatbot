export default function MessageList({ messages }) {
  return (
    <>
      {messages.map(message => (
        <div key={message._id}>
          <div className="msg right-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">Berry</div>
                {/* <div className="msg-info-time">{message.createdAt.$date.$numberLong}</div> */}
              </div>
              <div className="msg-text">{message.text}</div>
            </div>
          </div>
          <div className="msg left-msg">
            <div className="msg-img" />
            <div className="msg-bubble">
              <div className="msg-info">
                <div className="msg-info-name">BOT</div>
                {/* <div className="msg-info-time">{message.createdAt.$date.$numberLong}</div> */}
              </div>
              <div className="msg-text">{message.response}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
