import MessageList from "../components/MessageList";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import Unauthorized from "../components/Unauthorized";
import { CALC_SHARED_KEY, ENCRYPT_MSG, DECRYPT_MSG } from "../utils/helpers";
import { useSocket } from "../context/SocketContext";

export default function Chat() {
  const [toggleSwitch, setToggleSwitch] = useState(false);
  const [user, setUser] = useUser();
  const [otherUser, setOtherUser] = useState(null);
  const [sharedKey, setSharedKey] = useState(null);
  const socket = useSocket();
  const [decMessages, setDecMessages] = useState([]);
  const [encMessages, setEncMessages] = useState([]);
  const [msgTxt, setMsgText] = useState("");
  const router = useRouter();
  const { roomId } = router.query;

  useEffect(() => {
    if (!socket || !user) return;
    let shared;
    socket.emit("other_user_in_room", {
      combinedRoomId: roomId,
      myId: user.id,
    });
    socket.on("other_user_in_room", (otherUser) => {
      setOtherUser(otherUser);
      shared = CALC_SHARED_KEY(user.p, otherUser.public, user.private);
      setSharedKey(shared);
    });
    socket.on("message_recieve", (message) => {
      const decMsg = DECRYPT_MSG(message.message, shared);
      setEncMessages((prevMessage) => {
        return [
          { senderId: message.senderId, message: message.message },
          ...prevMessage,
        ];
      });
      setDecMessages((prevMessage) => {
        const data = [
          { senderId: message.senderId, message: decMsg },
          ...prevMessage,
        ];
        return data;
      });
    });
  }, []);
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
  }, [decMessages, encMessages]);

  const handleMessageSend = (e) => {
    e.preventDefault();
    const encMsg = ENCRYPT_MSG(msgTxt, sharedKey);
    socket.emit("message_send", {
      combinedRoom: roomId,
      message: encMsg.toString(),
      senderId: user.id,
    });
    setMsgText("");
  };

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
              {otherUser && otherUser?.name.length > 10
                ? otherUser && otherUser?.name.slice(0, 10) + "..."
                : otherUser && otherUser?.name}
            </h2>
            <div className="d-flex align-center gap">
              <small className="badge purple">
                {otherUser && otherUser.public}
              </small>
              <small className="badge red">
                {sharedKey ? sharedKey : "Shared Key"}
              </small>
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
          {decMessages.length <= 0 ? (
            "No Messages To Display"
          ) : (
            <MessageList
              messages={toggleSwitch === true ? encMessages : decMessages}
              myId={user.id}
              myName={user.name}
              otherUserName={otherUser.name}
            />
          )}
        </div>
        <form action="#" onSubmit={(e) => handleMessageSend(e)}>
          <div className="d-grid grid-column chat-form-div">
            <label htmlFor="message"> Type Your Message</label>
            <input
              type="text"
              id="message"
              className="form-control margin-right text-normal"
              placeholder="Aa"
              value={msgTxt}
              onChange={(e) => setMsgText(e.target.value)}
            />
            <button className="btn btn-primary">Send</button>
          </div>
        </form>
      </div>
    </div>
  );
}
