import React from "react";

export default function MessageList({ messages, userId }) {
  return (
    <ul className="message-list d-flex flex-column gap ">
      {messages.map((item, idx) => {
        const rand = Math.random() < 0.5;

        return (
          <div
            key={`msg-item-${idx}`}
            className={`d-flex w-100 h-fit-content ${
              rand === true && "flex-justify-end msg-self"
            }`}
          >
            <li className="message-item">
              <h3 className="msg-sender">Suparth</h3>
              <p className="msg-body">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Officia dolores quidem maxime quasi sint eius, odio ratione
                earum non quos iusto perferendis mollitia. Corrupti vel eveniet
                ratione dicta, dolor tempora!
              </p>
            </li>
          </div>
        );
      })}
    </ul>
  );
}
