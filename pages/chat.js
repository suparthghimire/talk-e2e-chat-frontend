import MessageList from "../components/MessageList";
import { useState, useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import Unauthorized from "../components/Unauthorized";

export default function Chat() {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [user, setUser] = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user === null)
      setTimeout(() => {
        router.push("/");
      }, 500);
  }, [user, router]);

  useEffect(() => {
    const msgList = document.querySelector(".message-list");
    if (msgList !== null)
      msgList.scrollTop = document.querySelector(".message-list")?.scrollHeight;
  }, []);

  if (user === null) {
    return <Unauthorized />;
  }

  return (
    <div className="p-2 d-grid chat text-normal">
      <div className="card w-fit-content">Go Back</div>
      <div className="card chat-wrapper d-grid h-max gap">
        <header className="header card d-flex flex-justify-between flex-align-center gap">
          <div className="d-flex flex-align-center gap flex-column-sm">
            <h2>
              {"Suparth".length > 10
                ? "Suparth".slice(0, 10) + "..."
                : "Suparth"}
            </h2>
            <div className="d-flex align-center gap">
              <small className="badge purple">Public Key</small>
              <small className="badge yellow">ddsdsds</small>
              <small className="badge red">Shared Key</small>
            </div>
          </div>
          <button
            className="btn text-normal btn-transparent p-0 d-flex flex-align-center gap"
            onClick={() => setToggleSwitch(!toggleSwitch)}
          >
            Encrypted Message
            <span
              className={`toggle-switch ${
                toggleSwitch === true ? "toggled" : ""
              }`}
            ></span>
          </button>
        </header>
        <div className="messages d-grid h-max w-max">
          <MessageList messages={arr} />
        </div>
        <form action="#">
          <div className="d-grid grid-column chat-form-div">
            <label htmlFor="message"> Type Your Message</label>
            <input
              type="text"
              id="message"
              className="form-control margin-right text-normal"
              placeholder="Aa"
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
