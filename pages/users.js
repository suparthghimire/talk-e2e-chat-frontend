import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import { useSocket } from "../context/SocketContext";
import UserList from "../components/UserList";
import Unauthorized from "../components/Unauthorized";
import { toast } from "react-toastify";
export default function Home() {
  const [users, setUsers] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const [user, setUser] = useUser();
  const socket = useSocket();
  const router = useRouter();
  const [invitationListShow, setInvitationListShow] = useState(false);
  const [newInvitationIconShow, setNewInvitationIconShow] = useState(true);
  useEffect(() => {
    if (user === null)
      setTimeout(() => {
        router.push("/");
      }, 500);
  }, []);
  useEffect(() => {
    if (!socket) return;
    socket.emit("get_all_users");
    socket.on("all_users", (allUsers) => {
      console.log("All Users", allUsers);
      allUsers =
        allUsers.length > 0
          ? allUsers.filter((usr) => usr.id !== user.id)
          : allUsers;
      setUsers(allUsers);
    });
    socket.on("new_user", (newUser) => {
      setUsers((oldUsers) => [newUser, ...oldUsers]);
    });
    socket.on("invitation_created", () => {
      toast.success("Invitation Sent Successfully!", { autoClose: 1000 });
    });
    socket.on("new_invitation", (newInvitation) => {
      setInvitations((oldInvitations) => [newInvitation, ...oldInvitations]);
      setNewInvitationIconShow(true);
    });
    socket.on("invitation_exists", () => {
      toast.error("Invitation for Chat Already Exists!", { autoClose: 1000 });
    });
  }, []);

  useEffect(() => {
    console.log(invitations);
  }, [invitations]);
  if (user === null) return <Unauthorized />;

  return (
    <div className="p-2 d-grid gap">
      <header className="card d-flex flex-center-between rooms-header">
        <div className="d-flex gap">
          <h2>{user.name}</h2>
          <div className="d-flex gap badge-list">
            <span className="badge yellow">Id: {user.id}</span>
            <span className="badge purple">Public Key: {user.public}</span>
            <span className="badge red">Private Key: {user.private}</span>
          </div>
        </div>
        <div
          className="invitations"
          onFocus={() => {
            setInvitationListShow(!invitationListShow);
            setNewInvitationIconShow(false);
          }}
          onBlur={() => {
            setInvitationListShow(false);
          }}
        >
          <div
            className={`invitation-btn ${
              newInvitationIconShow === true && "new-invitation"
            }`}
          >
            <button className="btn btn-primary text-normal">Invitations</button>
          </div>
          <ul
            className={`invitation-list card ${
              invitationListShow === true && "show"
            }`}
          >
            {invitations.length <= 0 ? (
              <p className="text-center text-normal">
                Noone Is Willing to Talk To You 😟.
                <br />
                But You Can Invite Others! 😄
              </p>
            ) : (
              invitations.map((invitation, idx) => {
                return (
                  <li
                    key={`invitation-room-id-${idx}`}
                    className="invitation-item"
                  >
                    <p>
                      {invitation.otherUser.name} Has Invited You For a Chat
                    </p>
                    <div className="d-flex gap">
                      <button className="btn btn-primary">
                        Accept Invitation
                      </button>
                      <button className="btn btn-primary">
                        Reject Invitation
                      </button>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </header>
      <div className="card w-fit-content">
        <h3>Online People</h3>
      </div>
      {users.length <= 0 ? (
        <p className="text-normal card">Opps! Looks Like Noone is Online 😬</p>
      ) : (
        <ul className="d-flex flex-wrap gap">
          <UserList users={users} />
        </ul>
      )}
    </div>
  );
}
