import { useEffect, useState } from "react";

export default function HelpModal() {
  const [modalOptn, setModalOpen] = useState(false);
  useEffect(() => {
    let firstVisit = JSON.parse(localStorage.getItem("first-visit-talk"));
    if (firstVisit === null) {
      firstVisit = true;
      localStorage.setItem("first-visit-talk", false);
    } else {
      localStorage.setItem("first-visit-talk", false);
    }
    setModalOpen(true);
  }, []);
  return (
    <>
      <button
        className="btn btn-white text-normal help-btn"
        onClick={() => setModalOpen(true)}
      >
        Help
      </button>
      <div
        className={`card help-modal ${
          modalOptn === true && "help-modal-display"
        }`}
        onClick={() => setModalOpen(false)}
      >
        <div className="card shadow-sm w-75">
          <div className="d-flex text-normal flex-center-between">
            <p>Talk - Help</p>
            <button className="btn btn-transparent">&#10005;</button>
          </div>
          <div className="mt-2 text-bold">About</div>
          <hr />
          <p className="mt-1">
            Talk is an End to End Encrypted Chat Application that combines
            Diffie Hellman and AES encryption. The conversation between 2
            communicating parties is encrypted via a shared key that is only
            visible to them. Anyone else (even the server through which data
            travel happens cannot decrypt the chat messages)
          </p>
          <p className="bold mt-2 text-bold">How to Use?</p>
          <hr />
          <ul className="list-styled mt-1">
            <li>Login Using your Username</li>
            <li>Invite anyone from List of active users</li>
            <li>
              If You get an Invitation, a Red Icon Jumps over Invitations
              button, from where you can Accept or Reject the Invitation
            </li>
            <li>
              If you Accept the Invitation or if anyone accepts your invitation,
              you are redirected to Message Page where you can chat with each
              other
            </li>
            <li>
              You can also see the Encrypted Message that is being transferred
              over the server
            </li>
          </ul>
          <p className="mt-2 text-bold">Details</p>
          <hr />
          <p className="mt-1">
            <a
              className="link"
              href="https://github.com/suparthghimire/talk-e2e-chat-frontend"
              target="_blank"
              rel="noreferrer"
            >
              View Code
            </a>
            &nbsp; | &nbsp;
            <a
              className="link"
              href="https://suparthnarayanghimire.com.np"
              target="_blank"
              rel="noreferrer"
            >
              Developer
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
