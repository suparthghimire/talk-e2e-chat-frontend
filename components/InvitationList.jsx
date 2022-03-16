import { useRouter } from "next/router";
import { useSocket } from "../context/SocketContext";
import { useUser } from "../context/UserContext";

export default function InvitationList({ invitations }) {
  console.log(invitations);
  const router = useRouter();
  const socket = useSocket();
  const [user, setUser] = useUser();
  const handleAccept = (invitation) => {
    socket.emit("invitation_accepted", {
      user,
      invitation,
    });
    router.push("/chat");
  };
  const handleReject = (combinedRoom, otherUser) => {
    socket.emit(
      "invitation_rejected",
      combinedRoom,
      user.id,
      otherUser.rooms[0]
    );
  };

  return (
    <>
      {invitations.map((invitation, idx) => {
        return (
          <li key={`invitation-room-id-${idx}`} className="invitation-item">
            <p>{invitation.otherUser.name} Has Invited You For a Chat</p>
            <div className="d-flex gap">
              <button
                className="btn btn-primary"
                onClick={() => handleAccept(invitation)}
              >
                Accept Invitation
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleReject(invitation.roomId, invitation.otherUser)
                }
              >
                Reject Invitation
              </button>
            </div>
          </li>
        );
      })}
    </>
  );
}
