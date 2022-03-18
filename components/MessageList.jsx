export default function MessageList({ messages, myId, myName, otherUserName }) {
  return (
    <ul className="message-list d-flex flex-column gap ">
      {messages.map((message, idx) => {
        const rand = Math.random() < 0.5;

        return (
          <div
            key={`msg-item-${idx}`}
            className={`d-flex w-100 h-fit-content ${
              myId === message.senderId && "flex-justify-end msg-self"
            }`}
          >
            <li className="message-item">
              <h3 className="msg-sender">
                {myId === message.senderId ? "You" : otherUserName}
              </h3>
              <p className="msg-body">{message.message}</p>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
